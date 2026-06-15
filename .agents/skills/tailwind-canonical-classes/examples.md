# Generic examples

## Colors

```tsx
// ❌ Arbitrary hex
className="bg-[#383838] hover:bg-[#2a2a2a]"

// ✅ Palette
className="bg-zinc-800 hover:bg-zinc-900"

// ✅ Theme tokens (when defined in @theme)
className="bg-primary text-primary-foreground hover:bg-primary/90"
```

## Spacing and sizing

```tsx
// ❌
className="mt-[16px] px-[20px] md:w-[158px]"

// ✅
className="mt-4 px-5 md:w-40"
```

## Opacity

```tsx
// ❌
className="border border-black/[.08]"

// ✅
className="border border-black/10"
```

## v3 → v4

```tsx
// ❌
className="flex flex-shrink-0 flex-grow bg-gradient-to-r from-blue-500 to-purple-500"

// ✅
className="flex shrink-0 grow bg-linear-to-r from-blue-500 to-purple-500"
```

## Primary action pattern

```tsx
// ❌ One-off brand hex
className="rounded-lg bg-[#0066ff] px-4 py-2 text-white hover:bg-[#0052cc]"

// ✅ Token or palette
className="rounded-lg bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
```

## Refactor on touch

When editing unrelated logic in a component, convert obvious non-canonical
classes on the same element or block — don't rewrite the whole file unless asked.
