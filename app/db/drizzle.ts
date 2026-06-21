import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'

import * as schema from './schema'

const globalForDb = globalThis as unknown as {
  pool: Pool | undefined
}

function createPool() {
  const connectionString = process.env.DATABASE_URL
  if (!connectionString) {
    throw new Error('DATABASE_URL is not set')
  }

  const isRemotePostgres =
    connectionString.includes('railway') ||
    connectionString.includes('rlwy.net')

  return new Pool({
    connectionString,
    ...(isRemotePostgres && { ssl: { rejectUnauthorized: false } }),
  })
}

const pool = globalForDb.pool ?? createPool()

if (process.env.NODE_ENV !== 'production') {
  globalForDb.pool = pool
}

export const db = drizzle(pool, { schema })
