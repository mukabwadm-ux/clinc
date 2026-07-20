'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Phone, MapPin, Mail, ArrowRight, Loader2, CheckCircle2 } from 'lucide-react'
import { contactSchema, type ContactFormData } from '@/lib/validations'

const contactDetails = [
  {
    Icon: Phone,
    label: 'Phone',
    value: '+254 723 887 417',
    href: 'tel:+254723887417',
    iconColor: '#1A2B5E',
    iconBg: 'rgba(26,43,94,0.08)',
  },
  {
    Icon: Mail,
    label: 'Email',
    value: 'clin@clincorps.com',
    href: 'mailto:clin@clincorps.com',
    iconColor: '#F5A623',
    iconBg: 'rgba(245,166,35,0.10)',
  },
  {
    Icon: MapPin,
    label: 'Location',
    value: 'Britam Towers, Upper Hill\nNairobi, Kenya 00100',
    href: null,
    iconColor: '#1A2B5E',
    iconBg: 'rgba(26,43,94,0.08)',
  },
]

export default function Contact() {
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [serverError, setServerError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>({ resolver: zodResolver(contactSchema) })

  const onSubmit = async (data: ContactFormData) => {
    setSubmitting(true)
    setServerError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Failed')
      setSuccess(true)
    } catch {
      setServerError('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="contact" className="min-h-screen grid grid-cols-1 lg:grid-cols-2">

      {/* ── Left: contact info ── */}
      <div className="relative p-6 sm:p-10 lg:p-14 xl:p-20 overflow-hidden flex flex-col justify-center" style={{ background: '#FAFAF8' }}>
        {/* Gold top accent */}
        <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: 'linear-gradient(90deg, #F5A623, #0070C0)' }} />

        <Image
          src="/clincorp_logo.png"
          alt="Clin-Corp"
          width={140}
          height={44}
          className="object-contain bg-white rounded-lg px-2 py-1 shadow-sm w-[120px] sm:w-[140px] h-auto mb-8 sm:mb-10"
        />

        {/* Heading */}
        <div className="flex items-center gap-3 mb-3">
          <div className="h-px w-8 rounded-full" style={{ background: '#F5A623' }} />
          <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[3px]" style={{ color: '#F5A623' }}>GET IN TOUCH</p>
        </div>
        <h2 className="font-sans font-black text-navy leading-tight" style={{ fontSize: 'clamp(28px, 4.5vw, 52px)' }}>
          Let&apos;s Talk <span className="text-blue">Coatings.</span>
        </h2>
        <p className="font-sans text-sm sm:text-base leading-relaxed mt-3 sm:mt-4 max-w-sm" style={{ color: '#6B7A99' }}>
          Ready to protect your assets with world-class Hempel coatings? Our team is available to advise on the right product solutions for your industry.
        </p>

        {/* Contact details */}
        <div className="mt-8 sm:mt-10 space-y-5">
          {contactDetails.map((c) => (
            <div key={c.label} className="flex items-start gap-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: c.iconBg }}
              >
                <c.Icon size={16} style={{ color: c.iconColor }} />
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest mb-1" style={{ color: '#8899AE' }}>{c.label}</p>
                {c.href ? (
                  <a href={c.href} className="font-sans font-semibold text-navy text-sm sm:text-base hover:text-blue transition-colors duration-200 cursor-pointer break-all">
                    {c.value}
                  </a>
                ) : (
                  <p className="font-sans font-semibold text-navy text-sm whitespace-pre-line">{c.value}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Hempel badge */}
        <div className="mt-8 sm:mt-10 bg-white rounded-2xl p-4 sm:p-5 flex items-center gap-4" style={{ border: '1px solid rgba(245,166,35,0.15)', boxShadow: '0 2px 12px rgba(26,43,94,0.06)' }}>
          <Image
            src="/hempel-distributor.jpg"
            alt="Official Hempel Distributor"
            width={70}
            height={52}
            className="object-contain rounded shrink-0"
          />
          <div>
            <p className="font-sans font-bold text-navy text-sm">Official Hempel Partner</p>
            <p className="font-sans text-xs mt-0.5" style={{ color: '#8899AE' }}>Authorized Distributor · East Africa</p>
          </div>
        </div>
      </div>

      {/* ── Right: contact form ── */}
      <div className="relative overflow-hidden p-6 sm:p-10 lg:p-14 xl:p-20 flex flex-col justify-center">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #040D1A 0%, #0D1B45 60%, #040D1A 100%)' }} />
        <div className="absolute top-0 right-0 w-[350px] h-[350px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(245,166,35,0.06) 0%, transparent 70%)', filter: 'blur(60px)' }} />

        <div className="relative z-10 w-full max-w-lg mx-auto">
          {success ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5" style={{ background: 'rgba(0,212,180,0.12)' }}>
                <CheckCircle2 size={32} style={{ color: '#00D4B4' }} />
              </div>
              <h3 className="font-sans font-black text-3xl text-white">Thank you.</h3>
              <p className="font-sans mt-3" style={{ color: '#6B7A99' }}>We&apos;ll be in touch shortly.</p>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-3 mb-2">
                <div className="h-px w-8 rounded-full" style={{ background: '#F5A623' }} />
                <p className="font-mono text-[10px] uppercase tracking-[3px]" style={{ color: '#F5A623' }}>SEND A MESSAGE</p>
              </div>
              <h3 className="font-sans font-black text-white text-xl sm:text-2xl mb-8 sm:mb-10">We&apos;re here to help.</h3>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-7 sm:space-y-8">
                {[
                  { id: 'fullName' as const, label: 'Full Name', type: 'text', placeholder: 'Your full name' },
                  { id: 'email' as const, label: 'Email Address', type: 'email', placeholder: 'you@company.com' },
                  { id: 'company' as const, label: 'Company / Organisation', type: 'text', placeholder: 'Your company name' },
                ].map((field) => (
                  <div key={field.id}>
                    <label className="block font-mono text-[10px] uppercase tracking-widest mb-2.5" style={{ color: '#6B7A99' }}>{field.label}</label>
                    <input
                      {...register(field.id)}
                      type={field.type}
                      placeholder={field.placeholder}
                      className="w-full bg-transparent border-0 border-b text-white placeholder:text-white/25 focus:outline-none px-0 py-2.5 font-sans text-sm transition-colors duration-200"
                      style={{ borderColor: 'rgba(255,255,255,0.12)' }}
                    />
                    {errors[field.id] && <p className="text-red-400 text-xs mt-1.5">{errors[field.id]?.message}</p>}
                  </div>
                ))}

                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-widest mb-2.5" style={{ color: '#6B7A99' }}>Message</label>
                  <textarea
                    {...register('message')}
                    rows={4}
                    placeholder="Tell us about your project or requirements..."
                    className="w-full bg-transparent border-0 border-b text-white placeholder:text-white/25 focus:outline-none px-0 py-2.5 font-sans text-sm transition-colors duration-200 resize-none"
                    style={{ borderColor: 'rgba(255,255,255,0.12)' }}
                  />
                  {errors.message && <p className="text-red-400 text-xs mt-1.5">{errors.message.message}</p>}
                </div>

                {serverError && <p className="text-red-400 text-sm">{serverError}</p>}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full flex items-center justify-center gap-2 font-black tracking-widest uppercase py-4 sm:py-5 rounded-xl text-xs sm:text-sm transition-all duration-200 cursor-pointer disabled:opacity-60"
                  style={{ background: '#F5A623', color: '#0D1B4B', boxShadow: '0 0 28px rgba(245,166,35,0.25)' }}
                >
                  {submitting ? (
                    <Loader2 className="animate-spin" size={18} />
                  ) : (
                    <>SEND ENQUIRY <ArrowRight size={16} /></>
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
