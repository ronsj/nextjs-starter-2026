import Link from 'next/link'

import { PasskeySignUpForm } from '@/app/components/auth/PasskeySignUpForm'

export default function SignUpPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-zinc-50 px-6 py-16 font-sans dark:bg-black">
      <main className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mb-8 flex flex-col gap-2">
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            Create account
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Enter your details, then create a passkey to sign in.
          </p>
        </div>

        <PasskeySignUpForm />

        <p className="mt-6 text-center text-sm text-zinc-600 dark:text-zinc-400">
          Already have an account?{' '}
          <Link
            href="/sign-in"
            className="font-medium text-zinc-900 dark:text-zinc-50"
          >
            Sign in
          </Link>
        </p>
      </main>
    </div>
  )
}
