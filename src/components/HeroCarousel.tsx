'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { Play } from 'lucide-react'

const SLIDES = [
  '/hero/hero-1.mp4',
  '/hero/hero-2.mp4',
  '/hero/hero-3.mp4',
  '/hero/hero-4.mp4',
  '/hero/hero-5.mp4',
]

/** Clip length in seconds; used only as a fallback if autoplay is blocked. */
const FALLBACK_DURATION = 10
/** Must match the wipe duration in globals.css so the outgoing clip stays
 *  covered until the incoming slide has fully painted over it. */
const WIPE_MS = 1150

export default function HeroCarousel() {
  const [index, setIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const thumbRef = useRef<HTMLVideoElement | null>(null)

  const next = (index + 1) % SLIDES.length

  const goTo = useCallback((i: number) => {
    setProgress(0)
    setIndex(((i % SLIDES.length) + SLIDES.length) % SLIDES.length)
  }, [])

  // Play the active clip, rewind the rest, and advance when it finishes.
  useEffect(() => {
    const active = videoRefs.current[index]

    videoRefs.current.forEach((v, i) => {
      if (!v || i === index) return
      v.pause()
      if (v.currentTime > 0) v.currentTime = 0
    })

    let cancelled = false
    if (active) {
      // Don't touch a freshly mounted clip: the autoPlay attribute has already
      // started it during parse, and seeking would restart the buffering.
      if (active.currentTime > 0) active.currentTime = 0
      // Autoplay can be refused (Low Power Mode, data saver). The timer below
      // keeps the carousel moving either way.
      void active.play().catch(() => {})
    }

    const ms = ((active?.duration || FALLBACK_DURATION) + 0.4) * 1000
    const timer = setTimeout(() => {
      if (!cancelled) goTo(index + 1)
    }, ms)

    return () => {
      cancelled = true
      clearTimeout(timer)
    }
  }, [index, goTo])

  const onTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const v = e.currentTarget
    if (v.duration) setProgress(Math.min(1, v.currentTime / v.duration))
  }

  return (
    <>
      {/* Video stack. Explicit z-index gives the slides their own stacking
          context so they stay under the hero overlay and copy. */}
      <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 0 }}>
        {SLIDES.map((src, i) => {
          const isActive = i === index
          return (
            <div
              key={src}
              aria-hidden={!isActive}
              className="absolute inset-0"
              style={{
                zIndex: isActive ? 2 : 1,
                clipPath: isActive ? 'inset(0 0 0 0)' : 'inset(0 0 0 100%)',
                transform: isActive ? 'scale(1)' : 'scale(1.06)',
                transition: isActive
                  ? `clip-path ${WIPE_MS}ms cubic-bezier(0.16,1,0.3,1), transform 1600ms cubic-bezier(0.16,1,0.3,1)`
                  : // Snap the outgoing slide back only once it is hidden behind
                    // the incoming one, so the reset is never visible.
                    `clip-path 0s linear ${WIPE_MS}ms, transform 0s linear ${WIPE_MS}ms`,
              }}
            >
              <video
                ref={(el) => {
                  videoRefs.current[i] = el
                }}
                src={src}
                muted
                playsInline
                // Present in the server-rendered HTML, so the first clip starts
                // during parse instead of waiting for hydration.
                autoPlay={isActive}
                preload={i === index ? 'auto' : i === next ? 'metadata' : 'none'}
                onTimeUpdate={isActive ? onTimeUpdate : undefined}
                onEnded={isActive ? () => goTo(index + 1) : undefined}
                className={`w-full h-full object-cover ${isActive ? 'hero-drift' : ''}`}
              />
            </div>
          )
        })}

        {/* Light bar riding the wipe edge — remounts per slide to replay */}
        <span key={`sweep-${index}`} className="hero-sweep" style={{ zIndex: 3 }} />
      </div>

      {/* Controls cluster */}
      <div className="absolute z-20 bottom-6 sm:bottom-8 right-4 sm:right-6 lg:right-8 flex flex-col items-end gap-2.5">
        <button
          type="button"
          onClick={() => goTo(next)}
          onMouseEnter={() => void thumbRef.current?.play().catch(() => {})}
          onMouseLeave={() => thumbRef.current?.pause()}
          aria-label={`Play next clip, ${next + 1} of ${SLIDES.length}`}
          className="group relative block overflow-hidden rounded-lg cursor-pointer w-28 sm:w-36 lg:w-44 aspect-video transition-all duration-300 hover:scale-[1.06]"
          style={{
            border: '1px solid rgba(255,255,255,0.22)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.45)',
            backdropFilter: 'blur(2px)',
          }}
        >
          <video
            key={next}
            ref={thumbRef}
            /* Media fragment parks the poster on a representative frame. */
            src={`${SLIDES[next]}#t=2`}
            muted
            playsInline
            loop
            preload="metadata"
            className="w-full h-full object-cover"
          />
          <span
            className="absolute inset-0 transition-colors duration-300"
            style={{ background: 'linear-gradient(to top, rgba(4,13,26,0.75), rgba(4,13,26,0.05))' }}
          />
          <span className="absolute inset-0 flex items-center justify-center">
            <span
              className="flex items-center justify-center rounded-full w-7 h-7 sm:w-8 sm:h-8 transition-all duration-300 group-hover:scale-110"
              style={{ background: 'rgba(245,166,35,0.92)' }}
            >
              <Play size={12} strokeWidth={3} style={{ color: '#0D1B4B', marginLeft: 1 }} />
            </span>
          </span>
          <span
            className="absolute left-1.5 bottom-1 font-sans uppercase tracking-[2px] text-[8px] sm:text-[9px]"
            style={{ color: 'rgba(255,255,255,0.85)' }}
          >
            Next
          </span>
          <span
            className="absolute inset-0 rounded-lg pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ boxShadow: 'inset 0 0 0 1px rgba(245,166,35,0.9), 0 0 24px rgba(245,166,35,0.35)' }}
          />
        </button>

        {/* Segmented progress */}
        <div className="flex items-center gap-1.5">
          <span
            className="font-mono text-[9px] sm:text-[10px] tabular-nums mr-1"
            style={{ color: 'rgba(255,255,255,0.55)' }}
          >
            {String(index + 1).padStart(2, '0')} / {String(SLIDES.length).padStart(2, '0')}
          </span>
          {SLIDES.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Go to clip ${i + 1}`}
              aria-current={i === index}
              className="h-[3px] rounded-full cursor-pointer transition-all duration-300 w-5 sm:w-6 hover:brightness-150"
              style={{ background: 'rgba(255,255,255,0.22)' }}
            >
              <span
                className="block h-full rounded-full"
                style={{
                  width: i === index ? `${progress * 100}%` : i < index ? '100%' : '0%',
                  background: '#F5A623',
                  transition: i === index ? 'width 260ms linear' : 'width 300ms ease',
                }}
              />
            </button>
          ))}
        </div>
      </div>
    </>
  )
}
