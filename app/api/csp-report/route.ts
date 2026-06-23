import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const report = await request.json()

    if (process.env.NODE_ENV !== 'production') {
      console.warn('[csp-report]', JSON.stringify(report, null, 2))
    }
  } catch {
    // Ignore malformed reports.
  }

  return new NextResponse(null, { status: 204 })
}
