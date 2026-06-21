'use client'

import { getAuthenticatorName } from '@better-auth/passkey'
import { useEffect, useState } from 'react'

import { authClient } from '@/app/lib/auth-client'

type PasskeyRecord = {
  id: string
  name: string | null
  aaguid: string | null
  createdAt: string | null
  deviceType: string
  backedUp: boolean
}

function getPasskeyLabel(passkey: PasskeyRecord) {
  return (
    passkey.name ||
    getAuthenticatorName(passkey.aaguid ?? undefined) ||
    'Passkey'
  )
}

async function fetchPasskeys(): Promise<PasskeyRecord[]> {
  const response = await fetch('/api/auth/passkey/list-user-passkeys', {
    credentials: 'include',
  })

  if (!response.ok) {
    throw new Error('Failed to load passkeys')
  }

  return response.json() as Promise<PasskeyRecord[]>
}

export function PasskeyManager() {
  const [passkeys, setPasskeys] = useState<PasskeyRecord[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isAdding, setIsAdding] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)

  useEffect(() => {
    let active = true

    void fetchPasskeys()
      .then((data) => {
        if (active) {
          setPasskeys(data)
          setIsLoading(false)
        }
      })
      .catch(() => {
        if (active) {
          setError('Failed to load passkeys')
          setIsLoading(false)
        }
      })

    return () => {
      active = false
    }
  }, [refreshKey])

  function reloadPasskeys() {
    setIsLoading(true)
    setRefreshKey((current) => current + 1)
  }

  async function handleAddPasskey() {
    setError(null)
    setIsAdding(true)

    const { error: addError } = await authClient.passkey.addPasskey({
      name: 'New passkey',
    })

    setIsAdding(false)

    if (addError) {
      setError(addError.message ?? 'Failed to add passkey')
      return
    }

    await reloadPasskeys()
  }

  async function handleRename(id: string, currentName: string) {
    const nextName = window.prompt('Passkey name', currentName)
    if (!nextName?.trim()) {
      return
    }

    setError(null)

    const response = await fetch('/api/auth/passkey/update-passkey', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, name: nextName.trim() }),
    })

    if (!response.ok) {
      setError('Failed to rename passkey')
      return
    }

    reloadPasskeys()
  }

  async function handleDelete(id: string, label: string) {
    if (!window.confirm(`Delete "${label}"?`)) {
      return
    }

    setError(null)

    const response = await fetch('/api/auth/passkey/delete-passkey', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })

    if (!response.ok) {
      setError('Failed to delete passkey')
      return
    }

    reloadPasskeys()
  }

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
            Your passkeys
          </h2>
          <button
            type="button"
            onClick={handleAddPasskey}
            disabled={isAdding}
            className="rounded-full border border-black/10 px-4 py-1.5 text-sm font-medium transition-colors hover:bg-black/5 disabled:opacity-50 dark:border-white/15 dark:hover:bg-zinc-900"
          >
            {isAdding ? 'Adding…' : 'Add passkey'}
          </button>
        </div>

        {isLoading ? (
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Loading…</p>
        ) : passkeys.length === 0 ? (
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            No passkeys registered yet.
          </p>
        ) : (
          <ul className="divide-y divide-zinc-200 rounded-lg border border-zinc-200 dark:divide-zinc-800 dark:border-zinc-800">
            {passkeys.map((passkey) => {
              const label = getPasskeyLabel(passkey)

              return (
                <li
                  key={passkey.id}
                  className="flex items-center justify-between gap-4 px-4 py-3"
                >
                  <div>
                    <p className="font-medium text-zinc-900 dark:text-zinc-50">
                      {label}
                    </p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      {passkey.deviceType}
                      {passkey.backedUp ? ' · synced' : ''}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => handleRename(passkey.id, label)}
                      className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
                    >
                      Rename
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(passkey.id, label)}
                      className="text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              )
            })}
          </ul>
        )}
      </div>

      {error ? (
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      ) : null}
    </div>
  )
}
