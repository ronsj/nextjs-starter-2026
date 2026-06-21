import { headers } from 'next/headers'
import Link from 'next/link'

import { SignOutButton } from '@/app/components/auth/sign-out-button'
import { Greeting } from '@/app/components/greeting'
import { auth } from '@/app/lib/auth'

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex w-full max-w-3xl flex-1 flex-col items-center justify-between bg-white px-16 py-32 sm:items-start dark:bg-black">
        <span className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50">
          Next.js
        </span>
        {session ? (
          <Greeting name={session.user.name} />
        ) : (
          <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
            <h1 className="max-w-xs text-3xl leading-10 font-semibold tracking-tight text-black dark:text-zinc-50">
              To get started, edit the page.tsx file.
            </h1>
            <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              Looking for a starting point or more instructions? Head over to{' '}
              <a
                href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                className="font-medium text-zinc-950 dark:text-zinc-50"
              >
                Templates
              </a>{' '}
              or the{' '}
              <a
                href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                className="font-medium text-zinc-950 dark:text-zinc-50"
              >
                Learning
              </a>{' '}
              center.
            </p>
          </div>
        )}
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          {session ? (
            <>
              <Link
                className="flex h-12 w-full items-center justify-center rounded-full border border-black/10 px-5 transition-colors hover:border-transparent hover:bg-black/5 md:w-40 dark:border-white/15 dark:hover:bg-zinc-900"
                href="/account"
              >
                Account
              </Link>
              <SignOutButton />
            </>
          ) : (
            <>
              <a
                className="bg-foreground text-background hover:bg-foreground/90 flex h-12 w-full items-center justify-center gap-2 rounded-full px-5 whitespace-nowrap transition-colors md:w-auto dark:hover:bg-zinc-300"
                href="/sign-in"
              >
                Sign in
              </a>
              <a
                className="flex h-12 w-full items-center justify-center rounded-full border border-black/10 px-5 transition-colors hover:border-transparent hover:bg-black/5 md:w-40 dark:border-white/15 dark:hover:bg-zinc-900"
                href="/sign-up"
              >
                Sign up
              </a>
            </>
          )}
        </div>
      </main>
    </div>
  )
}
