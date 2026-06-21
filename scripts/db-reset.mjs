import { config } from 'dotenv'
import pg from 'pg'

import { getPostgresPoolOptions } from './postgres-pool-options.mjs'

config({ path: '.env' })

const connectionString = process.env.DATABASE_URL
if (!connectionString) {
  console.error('DATABASE_URL is not set')
  process.exit(1)
}

const pool = new pg.Pool(getPostgresPoolOptions(connectionString))

try {
  await pool.query(`
    DROP TABLE IF EXISTS rate_limit, passkey, session, account, verification, "user" CASCADE;
  `)
  console.log('Dropped all auth tables.')
} finally {
  await pool.end()
}
