import { ChangePasswordForm } from '@/app/components/auth/ChangePasswordForm'

export default function AccountPage() {
  return (
    <div className="flex w-full flex-col gap-4">
      <h2 className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
        Password
      </h2>
      <ChangePasswordForm />
    </div>
  )
}
