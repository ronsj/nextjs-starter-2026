import { redirect } from 'next/navigation'

type SessionWithVerification = {
  user: {
    email: string
    emailVerified: boolean
  }
}

export function redirectIfUnverified(session: SessionWithVerification | null) {
  if (session && !session.user.emailVerified) {
    redirect(`/verify-email?email=${encodeURIComponent(session.user.email)}`)
  }
}
