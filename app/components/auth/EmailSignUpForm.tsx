'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { authClient } from '@/app/lib/auth-client'

const inputClassName =
  'rounded-lg border border-zinc-200 bg-white px-3 py-2 text-base font-normal text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-400 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:placeholder:text-zinc-500'

const labelClassName =
  'flex flex-col gap-1.5 text-sm font-medium text-zinc-700 dark:text-zinc-300'

export function EmailSignUpForm() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setIsLoading(true)

    const trimmedEmail = email.trim()
    const callbackURL = `${window.location.origin}/`

    const { error: signUpError } = await authClient.signUp.email({
      name: name.trim(),
      email: trimmedEmail,
      password,
      callbackURL,
    })

    setIsLoading(false)

    if (signUpError) {
      setError(signUpError.message ?? 'Registration failed')
      return
    }

    router.push(`/verify-email?email=${encodeURIComponent(trimmedEmail)}`)
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
      <label className={labelClassName}>
        Name
        <input
          type="text"
          name="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          autoComplete="name"
          required
          placeholder="Jane Doe"
          className={inputClassName}
        />
      </label>

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
          autoComplete="new-password"
          required
          minLength={8}
          placeholder="At least 8 characters"
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
        {isLoading ? 'Creating account…' : 'Create account'}
      </button>
    </form>
  )
}
