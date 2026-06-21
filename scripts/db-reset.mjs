import { config } from 'dotenv'
import pg from 'pg'

config({ path: '.env' })

const connectionString = process.env.DATABASE_URL
if (!connectionString) {
  console.error('DATABASE_URL is not set')
  process.exit(1)
}

const pool = new pg.Pool({ connectionString })

try {
  await pool.query(`
    DROP TABLE IF EXISTS passkey, session, account, verification, "user" CASCADE;
  `)
  console.log('Dropped all auth tables.')
} finally {
  await pool.end()
}
