'use client'

import { useState } from 'react'

import { authClient } from '@/app/lib/auth-client'

const inputClassName =
  'rounded-lg border border-zinc-200 bg-white px-3 py-2 text-base font-normal text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-400 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:placeholder:text-zinc-500'

const labelClassName =
  'flex flex-col gap-1.5 text-sm font-medium text-zinc-700 dark:text-zinc-300'

export function ForgotPasswordForm() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setIsLoading(true)

    const { error: resetError } = await authClient.requestPasswordReset({
      email: email.trim(),
      redirectTo: `${window.location.origin}/reset-password`,
    })

    setIsLoading(false)

    if (resetError) {
      setError(resetError.message ?? 'Request failed')
      return
    }

    setSubmitted(true)
  }

  if (submitted) {
    return (
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        If an account exists for that email, we sent a password reset link.
        Check the server console in development for a log entry starting with{' '}
        <code className="rounded bg-zinc-200 px-1 py-0.5 text-xs dark:bg-zinc-800">
          [dev email]
        </code>
        .
      </p>
    )
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

      {error ? (
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      ) : null}

      <button
        type="submit"
        disabled={isLoading}
        className="bg-foreground text-background hover:bg-foreground/90 flex h-11 w-full items-center justify-center rounded-full px-5 text-sm font-medium transition-colors disabled:opacity-50 dark:hover:bg-zinc-300"
      >
        {isLoading ? 'Sending…' : 'Send reset link'}
      </button>
    </form>
  )
}
