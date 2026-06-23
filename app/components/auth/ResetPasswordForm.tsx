'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { authClient } from '@/app/lib/auth-client'

const inputClassName =
  'rounded-lg border border-zinc-200 bg-white px-3 py-2 text-base font-normal text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-400 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:placeholder:text-zinc-500'

const labelClassName =
  'flex flex-col gap-1.5 text-sm font-medium text-zinc-700 dark:text-zinc-300'

type ResetPasswordFormProps = {
  token: string | null
  errorParam: string | null
}

export function ResetPasswordForm({
  token,
  errorParam,
}: ResetPasswordFormProps) {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  if (errorParam) {
    return (
      <div className="flex flex-col gap-4">
        <p className="text-sm text-red-600 dark:text-red-400">
          This reset link is invalid or has expired.
        </p>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          <Link
            href="/forgot-password"
            className="font-medium text-zinc-900 dark:text-zinc-50"
          >
            Request a new reset link
          </Link>
        </p>
      </div>
    )
  }

  if (!token) {
    return (
      <p className="text-sm text-red-600 dark:text-red-400">
        Missing reset token. Use the link from your email or{' '}
        <Link
          href="/forgot-password"
          className="font-medium text-zinc-900 dark:text-zinc-50"
        >
          request a new one
        </Link>
        .
      </p>
    )
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)

    if (!token) {
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setIsLoading(true)

    const { error: resetError } = await authClient.resetPassword({
      newPassword: password,
      token,
    })

    setIsLoading(false)

    if (resetError) {
      setError(resetError.message ?? 'Password reset failed')
      return
    }

    router.push('/sign-in')
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
      <label className={labelClassName}>
        New password
        <input
          type="password"
          name="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          autoComplete="new-password"
          required
          minLength={8}
          placeholder="At least 8 characters"
          className={inputClassName}
        />
      </label>

      <label className={labelClassName}>
        Confirm password
        <input
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          autoComplete="new-password"
          required
          minLength={8}
          placeholder="Repeat your password"
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
        {isLoading ? 'Resetting…' : 'Reset password'}
      </button>
    </form>
  )
}
