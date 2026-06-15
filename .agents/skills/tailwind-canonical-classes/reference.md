# Tailwind v4 reference

## Theme tokens (project-specific)

Each project defines its own tokens. Common patterns:

| Pattern | Typical source | Example utilities |
|---------|----------------|-------------------|
| Semantic colors | `@theme { --color-* }` | `bg-background`, `text-foreground` |
| CSS variables | `:root { --* }` mapped in `@theme` | `bg-primary`, `text-muted-foreground` |
| Fonts | `--font-*` in `@theme` | `font-sans`, `font-mono` |

**Rule:** Read the project's theme file before inventing `bg-[#...]` or new palette literals.

## v3 → v4 renames (common)

| Legacy (v3) | Canonical (v4) |
|-------------|----------------|
| `flex-shrink-0` | `shrink-0` |
| `flex-shrink` | `shrink` |
| `flex-grow` | `grow` |
| `flex-grow-0` | `grow-0` |
| `overflow-ellipsis` | `text-ellipsis` |
| `bg-gradient-to-*` | `bg-linear-to-*` |

## Arbitrary → scale

| Arbitrary | Typical scale |
|-----------|---------------|
| `p-[4px]`, `m-[4px]` | `p-1`, `m-1` |
| `p-[8px]`, `gap-[8px]` | `p-2`, `gap-2` |
| `p-[16px]`, `mt-[16px]` | `p-4`, `mt-4` |
| `rounded-[8px]` | `rounded-lg` |
| `w-[160px]` | `w-40` |
| `max-w-[768px]` | `max-w-3xl` (check closest step) |

Use the nearest scale step unless design requires exact pixels.

## Opacity

| Avoid | Prefer |
|-------|--------|
| `border-black/[.08]` | `border-black/10` |
| `bg-black/[.05]` | `bg-black/5` |
| `text-white/[.72]` | `text-white/70` or nearest `/10` step |

## Flex / layout aliases

| Avoid | Prefer |
|-------|--------|
| `flex-shrink-0` | `shrink-0` |
| `flex-grow` | `grow` |
| `min-h-[100vh]` | `min-h-screen` |
| `h-[100%]` | `h-full` |

## Decision order

1. Semantic theme token
2. Tailwind palette + opacity scale
3. Standard spacing/sizing/radius scale
4. Arbitrary value (last resort)
