import nodemailer, { type Transporter } from 'nodemailer'
import { SENDER_EMAIL } from '@/lib/site'

// Built on first use, not at import time — see supabaseAdmin.ts for why.
let transporter: Transporter | null = null

function getTransporter(): Transporter {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT ?? 587),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })
  }
  return transporter
}

export async function sendMail(opts: { to: string; subject: string; html: string }): Promise<void> {
  await getTransporter().sendMail({
    from: process.env.SMTP_FROM || SENDER_EMAIL,
    to: opts.to,
    subject: opts.subject,
    html: opts.html,
  })
}
