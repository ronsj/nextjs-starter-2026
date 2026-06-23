import Link from 'next/link'

export default async function VerifyEmailPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>
}) {
  const { email } = await searchParams

  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-zinc-50 px-6 py-16 font-sans dark:bg-black">
      <main className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mb-8 flex flex-col gap-2">
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            Verify your email
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            {email ? (
              <>
                We sent a verification link for{' '}
                <span className="font-medium text-zinc-900 dark:text-zinc-50">
                  {email}
                </span>
                .
              </>
            ) : (
              'We sent a verification link to your email address.'
            )}
          </p>
        </div>

        <div className="flex flex-col gap-4 rounded-lg border border-zinc-200 bg-zinc-50 p-4 text-sm text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
          <p>
            In development, check the server console for a log entry starting
            with{' '}
            <code className="rounded bg-zinc-200 px-1 py-0.5 text-xs dark:bg-zinc-800">
              [dev email]
            </code>{' '}
            and open the verification URL from there.
          </p>
          <p>
            After verifying, sign in with your email and password on the sign-in
            page.
          </p>
        </div>

        <p className="mt-6 text-center text-sm text-zinc-600 dark:text-zinc-400">
          <Link
            href="/sign-in"
            className="font-medium text-zinc-900 dark:text-zinc-50"
          >
            Go to sign in
          </Link>
        </p>
      </main>
    </div>
  )
}
