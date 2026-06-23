'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { authClient } from '@/app/lib/auth-client'

const inputClassName =
  'rounded-lg border border-zinc-200 bg-white px-3 py-2 text-base font-normal text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-400 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:placeholder:text-zinc-500'

const labelClassName =
  'flex flex-col gap-1.5 text-sm font-medium text-zinc-700 dark:text-zinc-300'

export function EmailSignInForm() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [needsVerification, setNeedsVerification] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setNeedsVerification(false)
    setIsLoading(true)

    const { data, error: signInError } = await authClient.signIn.email({
      email: email.trim(),
      password,
    })

    setIsLoading(false)

    if (signInError) {
      if (signInError.status === 403) {
        setNeedsVerification(true)
        setError('Please verify your email before signing in.')
        return
      }

      setError(signInError.message ?? 'Sign in failed')
      return
    }

    if (data) {
      router.push('/')
      router.refresh()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
      <label className={labelClassName}>
        Email
        <input
          type="email"
          name="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          autoComplete="email"
          required
          placeholder="you@example.com"
          className={inputClassName}
        />
      </label>

      <label className={labelClassName}>
        Password
        <input
          type="password"
          name="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          autoComplete="current-password"
          required
          placeholder="Your password"
          className={inputClassName}
        />
      </label>

      {error ? (
        <div className="flex flex-col gap-2">
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          {needsVerification ? (
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              <Link
                href={`/verify-email?email=${encodeURIComponent(email.trim())}`}
                className="font-medium text-zinc-900 dark:text-zinc-50"
              >
                Resend verification instructions
              </Link>
            </p>
          ) : null}
        </div>
      ) : null}

      <button
        type="submit"
        disabled={isLoading}
        className="bg-foreground text-background hover:bg-foreground/90 flex h-11 w-full items-center justify-center rounded-full px-5 text-sm font-medium transition-colors disabled:opacity-50 dark:hover:bg-zinc-300"
      >
        {isLoading ? 'Signing in…' : 'Sign in'}
      </button>
    </form>
  )
}
