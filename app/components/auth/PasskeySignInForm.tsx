'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { authClient } from '@/app/lib/auth-client'

export function PasskeySignInForm() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (
      typeof PublicKeyCredential === 'undefined' ||
      !PublicKeyCredential.isConditionalMediationAvailable
    ) {
      return
    }

    void PublicKeyCredential.isConditionalMediationAvailable().then(
      (available) => {
        if (available) {
          void authClient.signIn.passkey({ autoFill: true })
        }
      }
    )
  }, [])

  async function handleSignIn() {
    setError(null)
    setIsLoading(true)

    const { data, error: signInError } = await authClient.signIn.passkey()

    setIsLoading(false)

    if (signInError) {
      setError(signInError.message ?? 'Sign in failed')
      return
    }

    if (data) {
      router.push('/')
      router.refresh()
    }
  }

  return (
    <div className="flex w-full flex-col gap-4">
      <label className="flex flex-col gap-1.5 text-sm font-medium text-zinc-700 dark:text-zinc-300">
        Email
        <input
          type="email"
          name="email"
          autoComplete="username webauthn"
          placeholder="you@example.com"
          className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-base font-normal text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-400 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:placeholder:text-zinc-500"
        />
      </label>

      {error ? (
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      ) : null}

      <button
        type="button"
        onClick={handleSignIn}
        disabled={isLoading}
        className="bg-foreground text-background hover:bg-foreground/90 flex h-11 w-full items-center justify-center rounded-full px-5 text-sm font-medium transition-colors disabled:opacity-50 dark:hover:bg-zinc-300"
      >
        {isLoading ? 'Signing in…' : 'Sign in with passkey'}
      </button>
    </div>
  )
}
