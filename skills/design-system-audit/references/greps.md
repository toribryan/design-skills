# Audit greps

Ripgrep commands for the codebase half of an audit. Set `SRC` to the component
and page directories, and exclude the token source, stories, tests and
generated output. Run each, record the count, and keep the command in the report
so the next audit can diff against it.

```bash
SRC="src/components src/app"
EXCL=(--glob '!**/*.stories.*' --glob '!**/*.test.*' --glob '!**/globals.css' \
      --glob '!**/tokens/**' --glob '!**/dist/**' --glob '!**/*.svg')
```

## 1. Color literals

```bash
# Hex
rg -n "${EXCL[@]}" '#[0-9a-fA-F]{3,8}\b' $SRC
# Color functions
rg -n "${EXCL[@]}" -o '(rgba?|hsla?|oklch|oklab|lab|lch)\([^)]*\)' $SRC
# Tailwind arbitrary colors
rg -n "${EXCL[@]}" -o '\b(bg|text|border|ring|fill|stroke|outline|from|to|via|shadow)-\[(#|rgb|hsl|oklch)[^\]]*\]' $SRC
```

Expect false positives from anchors (`href="#top"`) and IDs. Read before reporting.

## 2. Opacity modifiers on token colors

```bash
rg -n "${EXCL[@]}" -o '\b(bg|text|border|ring|outline|fill|stroke|from|to|via|shadow|divide|placeholder|decoration)-[a-z]+(-[a-z0-9]+)*/[0-9]{1,3}\b' $SRC
```

Only a finding if the system names alpha roles (`-subtle`, `-hover`, `-ring`).
Where it does not, count them anyway: each distinct `/N` is an undeclared token.

## 3. Primitive ramp classes in components

```bash
rg -n "${EXCL[@]}" -o '\b(bg|text|border|ring|fill|stroke|outline|from|to|via|divide|placeholder)-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(50|[1-9]00|950)\b' $SRC
# Also bare white/black, which never follow a theme
rg -n "${EXCL[@]}" -o '\b(bg|text|border)-(white|black)\b' $SRC
# CSS variable primitives referenced directly
rg -n "${EXCL[@]}" -o 'var\(--(color-)?(gray|neutral|slate|red|blue|green)-[0-9]+\)' $SRC
```

## 4. Type

```bash
# Tailwind size utilities, with counts
rg -o --no-filename "${EXCL[@]}" '\btext-(xs|sm|base|lg|[2-9]?xl)\b' $SRC | sort | uniq -c | sort -rn
# Arbitrary sizes and line heights
rg -n "${EXCL[@]}" -o '\b(text|leading|tracking)-\[[^\]]+\]' $SRC
# CSS font-size declarations
rg -o --no-filename "${EXCL[@]}" 'font-size:\s*[^;"]+' $SRC | sort | uniq -c | sort -rn
# Weights
rg -o --no-filename "${EXCL[@]}" '\bfont-(thin|extralight|light|normal|medium|semibold|bold|extrabold|black)\b' $SRC | sort | uniq -c
```

More than 9 distinct sizes, or any arbitrary size without a comment, is a finding.

## 5. Spacing, radius, sizes

```bash
# Any arbitrary pixel value, grouped
rg -o --no-filename "${EXCL[@]}" '\b[a-z-]+-\[-?[0-9.]+px\]' $SRC | sort | uniq -c | sort -rn
# Radius literals
rg -n "${EXCL[@]}" -o 'rounded(-[a-z]+)?-\[[^\]]+\]|border-radius:\s*[^;]+' $SRC
# z-index literals
rg -n "${EXCL[@]}" -o 'z-\[[0-9]+\]|z-index:\s*[0-9]+' $SRC
```

Repeated arbitrary values (the same `ring-[3px]` 24 times) are a de facto token:
either promote them or document them as a convention.

## 6. Theme branching

```bash
rg -n "${EXCL[@]}" -o 'dark:[a-z0-9:\[\]=_-]+' $SRC
```

Each hit is a place where a semantic role is missing, unless commented.

## 7. Motion literals

```bash
rg -n "${EXCL[@]}" -o 'transition:\s*all|transition-all|duration-\[[^\]]+\]|cubic-bezier\([^)]*\)|[0-9]+ms' $SRC
```

## 8. Icons

```bash
rg -o --no-filename "${EXCL[@]}" "from ['\"](lucide-react|@phosphor-icons/react|@heroicons/react[^'\"]*|react-icons[^'\"]*|@tabler/icons-react)['\"]" $SRC | sort | uniq -c
rg -c "${EXCL[@]}" '<svg' $SRC
```

## 9. Structure

```bash
# Components missing a data-slot on the root (list files with none)
rg -L "${EXCL[@]}" 'data-slot=' src/components --glob '*.tsx'
# Relative imports where the project uses aliases
rg -n "${EXCL[@]}" "from ['\"]\.\./" src/components
# Components without a stories file
for f in src/components/*.tsx; do case "$f" in *.stories.tsx|*.test.tsx) continue;; esac
  [ -f "${f%.tsx}.stories.tsx" ] || echo "no stories: $f"; done
```

## 10. Figma drift

With the Figma MCP connected:

1. `get_variable_defs` on the library's component sheet: list variable names per
   collection and mode.
2. List code tokens: `rg -o --no-filename '^\s*--[a-z0-9-]+' src/styles/globals.css | sort -u`.
3. Normalize (`color/primary/hover` to `primary-hover`) and diff both ways.
4. For shared names, compare resolved values per mode (hex with alpha).
5. For components: `search_design_system` or `get_metadata` on the component
   page; compare variant property names and values to cva variants in code.
