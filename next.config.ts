import type { NextConfig } from 'next'

const contentSecurityPolicy = [
  "default-src 'self'",
  // Only self-hosted images
  "img-src 'self'",
  // Add external analytics script origins here
  "script-src 'self'",
  // Add fonts.googleapis.com here if needed
  "font-src 'self'",
  // Better Auth client hits /api/auth/* on same origin
  "connect-src 'self'",
  // Stops <base href> injection
  "object-src 'self'",
  // Stops form submissions to external sites
  "form-action 'self'",
  // Same as X-Frame-Options: DENY
  "frame-ancestors 'none'",
]

if (process.env.NODE_ENV === 'production') {
  // Pairs with 'Strict-Transport-Security' header in production
  contentSecurityPolicy.push('upgrade-insecure-requests')
}

const permissionsPolicy = [
  'camera=()',
  'microphone=()',
  'geolocation=()',
  'payment=()',
  'browsing-topics=()',
]

const securityHeaders = [
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Content-Security-Policy',
    value: contentSecurityPolicy.join('; '),
  },
  {
    key: 'Permissions-Policy',
    value: permissionsPolicy.join(', '),
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
]

if (process.env.NODE_ENV === 'production') {
  securityHeaders.push({
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains; preload',
  })
}

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ]
  },
}

export default nextConfig
