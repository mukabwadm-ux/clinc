import { Resend } from 'resend'
import { NextResponse } from 'next/server'
import { z } from 'zod'
import { supabaseAdmin } from '@/lib/supabaseAdmin'

const resend = new Resend(process.env.RESEND_API_KEY)

const quoteSchema = z.object({
  productName: z.string().min(1).max(500),
  fullName: z.string().min(2).max(200),
  email: z.string().email().max(300),
  phone: z.string().max(50).optional().default(''),
  company: z.string().min(1).max(300),
  message: z.string().min(10).max(5000),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const parsed = quoteSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid form data' }, { status: 400 })
    }

    const { productName, fullName, email, phone, company, message } = parsed.data

    await supabaseAdmin.from('quotes').insert([{
      product_name: productName,
      full_name: fullName,
      email,
      phone: phone || null,
      company,
      message,
      status: 'new',
    }])

    await resend.emails.send({
      from: 'Clincorps Website <enquiries@clincorp.co.ke>',
      to: ['clin@clincorps.com'],
      subject: `Quote Request: ${productName} — ${fullName} (${company})`,
      html: `
        <h2 style="color:#040D1A">New Product Quote Request</h2>
        <table style="border-collapse:collapse;width:100%;font-family:sans-serif;font-size:14px">
          <tr><td style="padding:6px 0;color:#6B7A99;width:130px">Product</td><td style="padding:6px 0;font-weight:bold;color:#F5A623">${productName}</td></tr>
          <tr><td style="padding:6px 0;color:#6B7A99">Name</td><td style="padding:6px 0">${fullName}</td></tr>
          <tr><td style="padding:6px 0;color:#6B7A99">Email</td><td style="padding:6px 0"><a href="mailto:${email}">${email}</a></td></tr>
          <tr><td style="padding:6px 0;color:#6B7A99">Company</td><td style="padding:6px 0">${company}</td></tr>
          ${phone ? `<tr><td style="padding:6px 0;color:#6B7A99">Phone</td><td style="padding:6px 0">${phone}</td></tr>` : ''}
        </table>
        <hr style="margin:16px 0;border:none;border-top:1px solid #eee"/>
        <p style="color:#6B7A99;font-size:13px;font-weight:bold;margin-bottom:6px">Requirements</p>
        <p style="white-space:pre-wrap;font-size:14px">${message}</p>
        <hr style="margin:16px 0;border:none;border-top:1px solid #eee"/>
        <p style="font-size:11px;color:#9CAABB">Submitted via Clincorps product quote form</p>
      `,
    })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to submit quote' }, { status: 500 })
  }
}
