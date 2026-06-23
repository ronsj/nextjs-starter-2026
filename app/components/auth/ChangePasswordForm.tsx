'use client'

import { useState } from 'react'

import { authClient } from '@/app/lib/auth-client'

const inputClassName =
  'rounded-lg border border-zinc-200 bg-white px-3 py-2 text-base font-normal text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-400 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:placeholder:text-zinc-500'

const labelClassName =
  'flex flex-col gap-1.5 text-sm font-medium text-zinc-700 dark:text-zinc-300'

export function ChangePasswordForm() {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setSuccess(false)

    if (newPassword !== confirmPassword) {
      setError('New passwords do not match')
      return
    }

    setIsLoading(true)

    const { error: changeError } = await authClient.changePassword({
      currentPassword,
      newPassword,
    })

    setIsLoading(false)

    if (changeError) {
      setError(changeError.message ?? 'Failed to change password')
      return
    }

    setCurrentPassword('')
    setNewPassword('')
    setConfirmPassword('')
    setSuccess(true)
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
      <label className={labelClassName}>
        Current password
        <input
          type="password"
          name="currentPassword"
          value={currentPassword}
          onChange={(event) => setCurrentPassword(event.target.value)}
          autoComplete="current-password"
          required
          className={inputClassName}
        />
      </label>

      <label className={labelClassName}>
        New password
        <input
          type="password"
          name="newPassword"
          value={newPassword}
          onChange={(event) => setNewPassword(event.target.value)}
          autoComplete="new-password"
          required
          minLength={8}
          placeholder="At least 8 characters"
          className={inputClassName}
        />
      </label>

      <label className={labelClassName}>
        Confirm new password
        <input
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          autoComplete="new-password"
          required
          minLength={8}
          className={inputClassName}
        />
      </label>

      {error ? (
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      ) : null}

      {success ? (
        <p className="text-sm text-green-600 dark:text-green-400">
          Password updated successfully.
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isLoading}
        className="bg-foreground text-background hover:bg-foreground/90 flex h-11 w-full items-center justify-center rounded-full px-5 text-sm font-medium transition-colors disabled:opacity-50 dark:hover:bg-zinc-300"
      >
        {isLoading ? 'Updating…' : 'Change password'}
      </button>
    </form>
  )
}
