import { Resend } from 'resend'
import { NextResponse } from 'next/server'
import { contactSchema } from '@/lib/validations'
import { supabaseAdmin } from '@/lib/supabaseAdmin'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const parsed = contactSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid form data' }, { status: 400 })
    }

    const { fullName, email, company, message } = parsed.data

    // Save to Supabase (non-blocking — don't fail the request if DB is down)
    await supabaseAdmin.from('contact_submissions').insert([{
      full_name: fullName,
      email,
      company: company ?? null,
      message,
    }])

    // Send email notification
    await resend.emails.send({
      from: 'Clincorps Website <enquiries@clincorp.co.ke>',
      to: ['clin@clincorps.com'],
      subject: `New Enquiry from ${fullName} — ${company}`,
      html: `
        <h2>New Website Enquiry</h2>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
  }
}
