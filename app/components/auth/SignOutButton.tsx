'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { authClient } from '@/app/lib/auth-client'

export function SignOutButton() {
  const router = useRouter()
  const [isSigningOut, setIsSigningOut] = useState(false)

  async function handleSignOut() {
    setIsSigningOut(true)

    await authClient.signOut()
    router.refresh()

    setIsSigningOut(false)
  }

  return (
    <button
      type="button"
      onClick={handleSignOut}
      disabled={isSigningOut}
      className="bg-foreground text-background hover:bg-foreground/90 flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-full px-5 whitespace-nowrap transition-colors disabled:opacity-60 md:w-auto dark:hover:bg-zinc-300"
    >
      {isSigningOut ? 'Signing out…' : 'Sign out'}
    </button>
  )
}
