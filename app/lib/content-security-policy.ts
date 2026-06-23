const isDevelopment = process.env.NODE_ENV !== 'production'
const isReportOnly = process.env.CSP_REPORT_ONLY === 'true'

export function createNonce(): string {
  return Buffer.from(crypto.randomUUID()).toString('base64')
}

export function buildContentSecurityPolicy(nonce: string): string {
  const directives = [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'${
      isDevelopment ? " 'unsafe-eval'" : ''
    }`,
    `style-src 'self' ${isDevelopment ? "'unsafe-inline'" : `'nonce-${nonce}'`}`,
    "img-src 'self' blob: data:",
    "font-src 'self'",
    "connect-src 'self'" + (isDevelopment ? ' ws: wss:' : ''),
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    'report-uri /api/csp-report',
  ]

  if (!isDevelopment) {
    directives.push('upgrade-insecure-requests')
  }

  return directives.join('; ')
}

export function getContentSecurityPolicyHeaderKey(): string {
  return isReportOnly
    ? 'Content-Security-Policy-Report-Only'
    : 'Content-Security-Policy'
}
