#!/usr/bin/env node
/*
 * Contrast validator for a semantic color system.
 *
 * Usage: node validate-contrast.mjs            (uses the example config below)
 *        node validate-contrast.mjs theme.json (same shape as CONFIG)
 *
 * Colors may be "#rrggbb", "#rrggbbaa", "oklch(L C H)" or "oklch(L C H / A)",
 * with L as 0-1 or a percentage and A as 0-1 or a percentage. Translucent
 * backgrounds are laid over the page, and translucent text over that, the way
 * the browser paints them. OKLCH colors outside sRGB are fitted by reducing
 * chroma (keeping lightness and hue), as an sRGB screen would show them.
 *
 * Reports WCAG 2 ratio and APCA Lc (0.0.98G-4g constants) for every pair,
 * in every mode, and exits 1 if any pair misses its WCAG minimum.
 * The OKLab matrices are Bjorn Ottosson's reference values, as in Fibo's
 * packages/ui/src/lib/color.ts.
 */
import { readFileSync } from "node:fs"

// Example: Fibo's defaults, light and dark. Replace with the project's roles.
const CONFIG = {
  modes: {
    light: {
      background: "oklch(1 0 0)",
      foreground: "oklch(0.145 0 0)",
      muted: "oklch(0.97 0 0)",
      "muted-foreground": "oklch(0.556 0 0)",
      primary: "oklch(0.205 0 0)",
      "primary-foreground": "oklch(0.985 0 0)",
      destructive: "oklch(0.505 0.213 27.518)",
      "destructive-foreground": "oklch(0.985 0 0)",
      "destructive-subtle": "oklch(0.505 0.213 27.518 / 8%)",
      success: "oklch(0.527 0.154 150.069)",
      "success-foreground": "oklch(0.985 0 0)",
      "success-subtle": "oklch(0.527 0.154 150.069 / 8%)",
    },
    dark: {
      background: "oklch(0.145 0 0)",
      foreground: "oklch(0.985 0 0)",
      muted: "oklch(0.269 0 0)",
      "muted-foreground": "oklch(0.708 0 0)",
      primary: "oklch(0.985 0 0)",
      "primary-foreground": "oklch(0.205 0 0)",
      destructive: "oklch(0.704 0.191 22.216)",
      "destructive-foreground": "oklch(0.145 0 0)",
      "destructive-subtle": "oklch(0.704 0.191 22.216 / 20%)",
      success: "oklch(0.792 0.209 151.711)",
      "success-foreground": "oklch(0.145 0 0)",
      "success-subtle": "oklch(0.792 0.209 151.711 / 20%)",
    },
  },
  page: "background",
  // min: WCAG ratio. apca: the Lc to aim for (reported, not enforced).
  pairs: [
    { fg: "foreground", bg: "background", min: 4.5, apca: 90, label: "Body text" },
    { fg: "muted-foreground", bg: "background", min: 4.5, apca: 60, label: "Muted text" },
    { fg: "muted-foreground", bg: "muted", min: 4.5, apca: 60, label: "Muted text on muted fill" },
    { fg: "primary-foreground", bg: "primary", min: 4.5, apca: 75, label: "Primary button label" },
    { fg: "primary", bg: "background", min: 3, apca: 45, label: "Primary fill vs page" },
    { fg: "destructive-foreground", bg: "destructive", min: 4.5, apca: 60, label: "Text on solid destructive" },
    { fg: "destructive", bg: "destructive-subtle", min: 4.5, apca: 60, label: "Destructive text on its tint" },
    { fg: "success-foreground", bg: "success", min: 4.5, apca: 60, label: "Text on solid success" },
    { fg: "success", bg: "success-subtle", min: 4.5, apca: 60, label: "Success text on its tint" },
  ],
}

// ---- parsing ----
function parse(input) {
  const s = input.trim()
  if (s.startsWith("#")) {
    const h = s.slice(1)
    const n = (i) => parseInt(h.slice(i, i + 2), 16) / 255
    return { rgb: { r: n(0), g: n(2), b: n(4) }, a: h.length === 8 ? n(6) : 1 }
  }
  const m = /^oklch\(\s*([\d.]+%?)\s+([\d.]+)\s+([\d.]+)\s*(?:\/\s*([\d.]+%?))?\s*\)$/i.exec(s)
  if (!m) throw new Error(`Cannot parse color: ${input}`)
  const num = (v, pct) => (v.endsWith("%") ? parseFloat(v) / 100 : parseFloat(v) / pct)
  const l = num(m[1], 1)
  const a = m[4] === undefined ? 1 : num(m[4], 1)
  return { rgb: oklchToRgb(fitGamut({ l, c: parseFloat(m[2]), h: parseFloat(m[3]) })), a }
}

// ---- OKLCH to sRGB ----
function linear({ l, c, h }) {
  const hr = (h * Math.PI) / 180
  const A = c * Math.cos(hr)
  const B = c * Math.sin(hr)
  const l1 = (l + 0.3963377774 * A + 0.2158037573 * B) ** 3
  const m1 = (l - 0.1055613458 * A - 0.0638541728 * B) ** 3
  const s1 = (l - 0.0894841775 * A - 1.291485548 * B) ** 3
  return [
    4.0767416621 * l1 - 3.3077115913 * m1 + 0.2309699292 * s1,
    -1.2684380046 * l1 + 2.6097574011 * m1 - 0.3413193965 * s1,
    -0.0041960863 * l1 - 0.7034186147 * m1 + 1.707614701 * s1,
  ]
}
const inGamut = (c) => linear(c).every((x) => x >= -0.0005 && x <= 1.0005)
function fitGamut(c) {
  if (inGamut(c)) return c
  let lo = 0
  let hi = c.c
  for (let i = 0; i < 24; i++) {
    const mid = (lo + hi) / 2
    if (inGamut({ ...c, c: mid })) lo = mid
    else hi = mid
  }
  return { ...c, c: lo }
}
const encode = (x) => (x <= 0.0031308 ? 12.92 * x : 1.055 * x ** (1 / 2.4) - 0.055)
function oklchToRgb(c) {
  const [r, g, b] = linear(c).map((x) => Math.min(1, Math.max(0, encode(x))))
  return { r, g, b }
}

// ---- compositing and contrast ----
const over = (top, a, under) => ({
  r: top.r * a + under.r * (1 - a),
  g: top.g * a + under.g * (1 - a),
  b: top.b * a + under.b * (1 - a),
})
const decode = (x) => (x <= 0.04045 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4)
const lum = ({ r, g, b }) => 0.2126 * decode(r) + 0.7152 * decode(g) + 0.0722 * decode(b)
function wcag(a, b) {
  const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x)
  return (hi + 0.05) / (lo + 0.05)
}
function apca(text, bg) {
  const y = ({ r, g, b }) => {
    const v = 0.2126729 * r ** 2.4 + 0.7151522 * g ** 2.4 + 0.072175 * b ** 2.4
    return v < 0.022 ? v + (0.022 - v) ** 1.414 : v
  }
  const yt = y(text)
  const yb = y(bg)
  if (Math.abs(yb - yt) < 0.0005) return 0
  if (yb > yt) {
    const s = (yb ** 0.56 - yt ** 0.57) * 1.14
    return s < 0.1 ? 0 : (s - 0.027) * 100
  }
  const s = (yb ** 0.65 - yt ** 0.62) * 1.14
  return s > -0.1 ? 0 : (s + 0.027) * 100
}

// ---- run ----
const config = process.argv[2] ? JSON.parse(readFileSync(process.argv[2], "utf8")) : CONFIG
let failures = 0
for (const [mode, roles] of Object.entries(config.modes)) {
  const get = (name) => {
    if (!(name in roles)) throw new Error(`${mode}: no role "${name}"`)
    return parse(roles[name])
  }
  const page = get(config.page)
  console.log(`\n${mode}`)
  for (const p of config.pairs) {
    const bgc = get(p.bg)
    const bg = over(bgc.rgb, bgc.a, page.rgb)
    const fgc = get(p.fg)
    const fg = over(fgc.rgb, fgc.a, bg)
    const ratio = wcag(fg, bg)
    const lc = Math.abs(apca(fg, bg))
    const pass = ratio >= p.min
    if (!pass) failures++
    console.log(
      `${pass ? "pass" : "FAIL"}  ${ratio.toFixed(2).padStart(5)}:1 (min ${p.min})  Lc ${lc
        .toFixed(0)
        .padStart(3)} (aim ${p.apca})  ${p.label}  [${p.fg} on ${p.bg}]`
    )
  }
}
console.log(`\n${failures === 0 ? "ready" : `${failures} blocking issues`}`)
process.exit(failures === 0 ? 0 : 1)
