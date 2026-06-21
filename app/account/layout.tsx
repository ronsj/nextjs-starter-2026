import { headers } from 'next/headers'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import { AccountTabs } from '@/app/components/account/account-tabs'
import { auth } from '@/app/lib/auth'
import { redirectIfUnverified } from '@/app/lib/require-verified-session'

export default async function AccountLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    redirect('/sign-in')
  }

  redirectIfUnverified(session)

  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-zinc-50 px-6 py-16 font-sans dark:bg-black">
      <main className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mb-6 flex flex-col gap-2">
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            Account
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Manage your account settings.
          </p>
        </div>

        <div className="mb-6">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Signed in as
          </p>
          <p className="font-medium text-zinc-900 dark:text-zinc-50">
            {session.user.name}
          </p>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            {session.user.email}
          </p>
        </div>

        <div className="mb-6">
          <AccountTabs />
        </div>

        {children}

        <p className="mt-6 text-center text-sm text-zinc-600 dark:text-zinc-400">
          <Link
            href="/"
            className="font-medium text-zinc-900 dark:text-zinc-50"
          >
            Back to home
          </Link>
        </p>
      </main>
    </div>
  )
}
