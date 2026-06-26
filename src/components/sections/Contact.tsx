'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Phone, MapPin, Mail, ArrowRight, Loader2, CheckCircle2 } from 'lucide-react'
import { contactSchema, type ContactFormData } from '@/lib/validations'

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
    <section id="contact" className="grid grid-cols-1 lg:grid-cols-2">
      {/* Left: contact info — warm cream */}
      <div className="relative bg-offwhite p-16 lg:p-24 overflow-hidden">
        {/* Accent top bar */}
        <div
          className="absolute top-0 left-0 right-0 h-1"
          style={{ background: 'linear-gradient(90deg, #F5A623, #00AEEF)' }}
        />
        <Image
          src="/clincorp_logo.png"
          alt="Clin-Corp"
          width={160}
          height={48}
          className="object-contain bg-white rounded-md px-2 py-1 shadow-sm"
        />
        <h2 className="font-sans font-black text-4xl lg:text-5xl text-navy mt-8 leading-tight">
          Get in <span className="text-blue">Touch.</span>
        </h2>
        <p className="font-sans text-slate text-base leading-relaxed mt-4">
          Ready to protect your assets with world-class Hempel coatings? Our team is available to
          advise on the right product solutions for your industry.
        </p>

        <div className="mt-10 space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-blue/10 flex items-center justify-center shrink-0">
              <Phone className="text-blue" size={18} />
            </div>
            <div>
              <p className="font-sans text-[10px] text-slate uppercase tracking-widest mb-1">Phone</p>
              <a href="tel:+254723887417" className="font-sans font-semibold text-navy hover:text-blue transition-colors">
                +254 723 887 417
              </a>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-blue/10 flex items-center justify-center shrink-0">
              <Mail className="text-blue" size={18} />
            </div>
            <div>
              <p className="font-sans text-[10px] text-slate uppercase tracking-widest mb-1">Email</p>
              <a href="mailto:clinton@clincorp.co.ke" className="font-sans font-semibold text-navy hover:text-blue transition-colors">
                clinton@clincorp.co.ke
              </a>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-blue/10 flex items-center justify-center shrink-0">
              <MapPin className="text-blue" size={18} />
            </div>
            <div>
              <p className="font-sans text-[10px] text-slate uppercase tracking-widest mb-1">Location</p>
              <p className="font-sans text-navy font-semibold text-sm">Britam Towers, Upper Hill</p>
              <p className="font-sans text-slate text-sm">Nairobi, Kenya 00100</p>
            </div>
          </div>
        </div>

        {/* Hempel distributor badge */}
        <div className="mt-10 bg-white rounded-2xl p-5 border border-blue/10 shadow-sm flex items-center gap-4">
          <Image src="/hempel-distributor.jpg" alt="Official Hempel Distributor" width={80} height={60} className="object-contain rounded" />
          <div>
            <p className="font-sans font-bold text-navy text-sm">Official Hempel Partner</p>
            <p className="font-sans text-slate text-xs mt-0.5">Authorized Distributor · East Africa</p>
          </div>
        </div>
      </div>

      {/* Right: contact form — rich dark */}
      <div className="relative overflow-hidden p-16 lg:p-24">
        <div className="absolute inset-0 bg-gradient-to-br from-[#07111F] to-[#0D1B45]" />
        <div
          className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(0,174,239,0.08) 0%, transparent 70%)', filter: 'blur(60px)' }}
        />

        <div className="relative z-10">
          {success ? (
            <div className="text-center py-12">
              <CheckCircle2 className="text-teal mx-auto mb-4" size={52} />
              <h3 className="font-sans font-black text-3xl text-white">Thank you.</h3>
              <p className="font-sans text-slate mt-3">We&apos;ll be in touch shortly.</p>
            </div>
          ) : (
            <>
              <h3 className="font-sans font-bold text-white text-xl mb-8">Send us a message</h3>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                <div>
                  <label className="block font-sans text-[10px] uppercase tracking-widest text-slate mb-2">
                    Full Name
                  </label>
                  <input
                    {...register('fullName')}
                    placeholder="Your full name"
                    className="w-full bg-transparent border-0 border-b border-white/15 text-white placeholder:text-slate/50 focus:outline-none focus:border-blue px-0 py-3 font-sans transition-colors"
                  />
                  {errors.fullName && <p className="text-red-400 text-xs mt-1">{errors.fullName.message}</p>}
                </div>

                <div>
                  <label className="block font-sans text-[10px] uppercase tracking-widest text-slate mb-2">
                    Email Address
                  </label>
                  <input
                    {...register('email')}
                    type="email"
                    placeholder="you@company.com"
                    className="w-full bg-transparent border-0 border-b border-white/15 text-white placeholder:text-slate/50 focus:outline-none focus:border-blue px-0 py-3 font-sans transition-colors"
                  />
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                </div>

                <div>
                  <label className="block font-sans text-[10px] uppercase tracking-widest text-slate mb-2">
                    Company / Organisation
                  </label>
                  <input
                    {...register('company')}
                    placeholder="Your company name"
                    className="w-full bg-transparent border-0 border-b border-white/15 text-white placeholder:text-slate/50 focus:outline-none focus:border-blue px-0 py-3 font-sans transition-colors"
                  />
                  {errors.company && <p className="text-red-400 text-xs mt-1">{errors.company.message}</p>}
                </div>

                <div>
                  <label className="block font-sans text-[10px] uppercase tracking-widest text-slate mb-2">
                    Message
                  </label>
                  <textarea
                    {...register('message')}
                    rows={4}
                    placeholder="Tell us about your project or requirements..."
                    className="w-full bg-transparent border-0 border-b border-white/15 text-white placeholder:text-slate/50 focus:outline-none focus:border-blue px-0 py-3 font-sans transition-colors resize-none"
                  />
                  {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>}
                </div>

                {serverError && <p className="text-red-400 text-sm">{serverError}</p>}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full flex items-center justify-center gap-2 bg-blue hover:bg-steel text-white font-bold tracking-widest uppercase py-5 rounded-xl text-sm transition-all hover:-translate-y-0.5 disabled:opacity-50 shadow-[0_4px_20px_rgba(0,174,239,0.3)] hover:shadow-[0_8px_30px_rgba(0,174,239,0.4)]"
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
