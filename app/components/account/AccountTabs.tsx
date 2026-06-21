'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const tabs = [{ href: '/account/passkeys', label: 'Passkeys' }] as const

export function AccountTabs() {
  const pathname = usePathname()

  return (
    <nav className="flex gap-1 border-b border-zinc-200 dark:border-zinc-800">
      {tabs.map((tab) => {
        const isActive = pathname === tab.href

        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={
              isActive
                ? 'border-b-2 border-zinc-900 px-3 py-2 text-sm font-medium text-zinc-900 dark:border-zinc-50 dark:text-zinc-50'
                : 'px-3 py-2 text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50'
            }
          >
            {tab.label}
          </Link>
        )
      })}
    </nav>
  )
}
