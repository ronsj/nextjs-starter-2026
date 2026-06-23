import Link from 'next/link'

import { ResetPasswordForm } from '@/app/components/auth/ResetPasswordForm'

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string; error?: string }>
}) {
  const { token, error } = await searchParams

  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-zinc-50 px-6 py-16 font-sans dark:bg-black">
      <main className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mb-8 flex flex-col gap-2">
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            Reset password
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Choose a new password for your account.
          </p>
        </div>

        <ResetPasswordForm token={token ?? null} errorParam={error ?? null} />

        <p className="mt-6 text-center text-sm text-zinc-600 dark:text-zinc-400">
          <Link
            href="/sign-in"
            className="font-medium text-zinc-900 dark:text-zinc-50"
          >
            Back to sign in
          </Link>
        </p>
      </main>
    </div>
  )
}
