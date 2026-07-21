'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Eye, EyeOff, Lock } from 'lucide-react'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      if (res.status === 429) {
        setError('Too many attempts. Please wait 15 minutes and try again.')
        return
      }
      if (res.ok) {
        router.push('/admin')
        router.refresh()
        return
      }
      setError('Invalid email or password.')
    } catch {
      setError('Network error — please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex" style={{ background: '#040D1A', fontFamily: 'var(--font-poppins, Poppins, sans-serif)' }}>
      {/* Left panel — brand */}
      <div className="hidden lg:flex flex-col justify-between w-[420px] shrink-0 px-10 py-12 border-r" style={{ background: 'linear-gradient(160deg, #0D1B45 0%, #040D1A 100%)', borderColor: 'rgba(255,255,255,0.06)' }}>
        <div>
          <div className="bg-white rounded-xl px-3 py-2 inline-block">
            <Image src="/clincorp_logo.png" alt="Clincorps" width={120} height={36} className="h-9 w-auto object-contain" />
          </div>
          <p className="font-mono text-[10px] uppercase tracking-[3px] mt-3" style={{ color: 'rgba(245,166,35,0.7)' }}>Admin Portal</p>
        </div>

        <div>
          <div className="w-10 h-0.5 mb-5 rounded-full" style={{ background: '#F5A623' }} />
          <h2 className="font-black text-white leading-tight" style={{ fontSize: 'clamp(24px,3vw,32px)' }}>
            Manage your<br /><span style={{ color: '#F5A623' }}>products</span> &amp;<br />customer enquiries.
          </h2>
          <p className="text-sm mt-4 leading-relaxed" style={{ color: 'rgba(107,122,153,0.9)' }}>
            Secure access to the Clincorps backend. All actions are protected and logged.
          </p>
        </div>

        <p className="font-mono text-[10px]" style={{ color: 'rgba(107,122,153,0.4)' }}>
          © {new Date().getFullYear()} Clincorps Limited · Secured
        </p>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-[400px]">
          {/* Mobile logo */}
          <div className="flex justify-center mb-8 lg:hidden">
            <div className="bg-white rounded-xl px-3 py-2">
              <Image src="/clincorp_logo.png" alt="Clincorps" width={110} height={34} className="h-8 w-auto object-contain" />
            </div>
          </div>

          <div className="mb-8">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: 'rgba(245,166,35,0.12)', border: '1px solid rgba(245,166,35,0.25)' }}>
              <Lock size={18} style={{ color: '#F5A623' }} />
            </div>
            <h1 className="font-black text-white text-2xl">Sign in</h1>
            <p className="text-sm mt-1" style={{ color: '#6B7A99' }}>Enter your admin credentials to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-xs font-semibold mb-1.5" style={{ color: '#6B7A99' }}>
                Email address
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full rounded-xl px-4 py-3 text-sm text-white outline-none transition-all"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.10)',
                }}
                onFocus={e => { e.currentTarget.style.borderColor = '#F5A623'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(245,166,35,0.12)' }}
                onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.10)'; e.currentTarget.style.boxShadow = 'none' }}
                placeholder="admin@clincorps.com"
                aria-required="true"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-xs font-semibold mb-1.5" style={{ color: '#6B7A99' }}>
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPass ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full rounded-xl px-4 py-3 pr-12 text-sm text-white outline-none transition-all"
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.10)',
                  }}
                  onFocus={e => { e.currentTarget.style.borderColor = '#F5A623'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(245,166,35,0.12)' }}
                  onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.10)'; e.currentTarget.style.boxShadow = 'none' }}
                  placeholder="••••••••"
                  aria-required="true"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(p => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded cursor-pointer transition-opacity hover:opacity-100 opacity-50"
                  aria-label={showPass ? 'Hide password' : 'Show password'}
                >
                  {showPass ? <EyeOff size={16} style={{ color: '#6B7A99' }} /> : <Eye size={16} style={{ color: '#6B7A99' }} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div role="alert" className="flex items-start gap-2 rounded-xl px-4 py-3 text-sm" style={{ background: 'rgba(239,68,68,0.10)', color: '#FCA5A5', border: '1px solid rgba(239,68,68,0.20)' }}>
                <span className="shrink-0 mt-0.5">⚠</span>
                <span>{error}</span>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading || !email || !password}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-black text-sm uppercase tracking-widest transition-all duration-200 cursor-pointer disabled:opacity-50 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
              style={{ background: '#F5A623', color: '#0D1B4B' }}
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
                  Signing in…
                </>
              ) : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
