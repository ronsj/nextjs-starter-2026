---
name: tailwind-canonical-classes
description: >-
  Tailwind v4 canonical utility conventions. Prefer theme tokens, standard scale
  utilities, and v4 class names over arbitrary values and legacy v3 aliases.
  Use when writing or editing className, reviewing UI PRs, auditing Tailwind
  usage, or migrating v3-style classes to v4.
---

# Tailwind canonical classes

Guidance for Tailwind v4 projects with a design token layer (`@theme`, CSS variables, or a shared globals stylesheet).

## When to apply

- Writing or editing components with `className`
- Refactoring existing utility strings
- Reviewing UI pull requests
- Auditing or migrating non-canonical / v3-style classes

## Core rules

1. **Theme first** — use design tokens before raw palette or arbitrary colors
2. **Scale second** — use spacing, sizing, radius, and opacity scales before `[...]` values
3. **v4 names** — use canonical utilities (see [reference.md](./reference.md))
4. **Convert on touch** — when editing a line, fix nearby non-canonical classes if the mapping is obvious

## Discovering project tokens

Before adding colors or fonts, read the project's theme source (typically a global CSS file with `@theme` or `:root` variables). Map utilities like:

- Semantic: `bg-background`, `text-foreground`, `border-border`, `text-muted-foreground`
- Fonts: `font-sans`, `font-mono`, `font-heading`

If no token exists and the value is reused, add it to `@theme` instead of hardcoding hex in JSX.

## Quick substitutions

| Avoid | Prefer |
|-------|--------|
| `bg-[#383838]`, `text-[red]` | Theme token or palette step (`bg-zinc-800`, `text-red-500`) |
| `mt-[16px]`, `rounded-[8px]` | Scale step (`mt-4`, `rounded-lg`) |
| `border-black/[.08]` | Named opacity (`border-black/10`) |
| `flex-shrink-0`, `flex-grow` | `shrink-0`, `grow` |
| `bg-gradient-to-r` | `bg-linear-to-r` |

Full tables: [reference.md](./reference.md)

## When arbitrary values are OK

- No theme token and no reasonable scale step
- Truly one-off layout constraint after checking the scale
- Variant or selector with no canonical equivalent (uncommon)

## Audit workflow

1. Search for arbitrary syntax: `\[[^\]]+\]` in UI files
2. Search legacy aliases: `flex-shrink`, `flex-grow`, `bg-gradient-to`
3. Replace using [reference.md](./reference.md); skip genuinely one-off values
4. Prefer semantic tokens for brand/surface/text roles
5. Verify light/dark (or other modes) if token usage changed

## Examples

Generic before/after patterns: [examples.md](./examples.md)
