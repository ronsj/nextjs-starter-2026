export async function sendDevEmail({
  to,
  subject,
  text,
}: {
  to: string
  subject: string
  text: string
}) {
  if (process.env.NODE_ENV === 'production') {
    throw new Error('Configure a production email provider before deploying')
  }

  console.info('[dev email]', { to, subject, text })
}
