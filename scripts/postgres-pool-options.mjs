/**
 * Shared Postgres pool options for scripts (e.g. db-reset).
 * Keep in sync with createPool() in app/db/drizzle.ts.
 */
export function getPostgresPoolOptions(connectionString) {
  const sslEnabled =
    process.env.DATABASE_SSL === 'true' ||
    connectionString.includes('sslmode=require')

  if (!sslEnabled) {
    return { connectionString }
  }

  return {
    connectionString,
    ssl: {
      rejectUnauthorized:
        process.env.DATABASE_SSL_REJECT_UNAUTHORIZED !== 'false',
    },
  }
}
