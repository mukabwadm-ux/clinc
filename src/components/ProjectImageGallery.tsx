'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface Props {
  images: string[]
  title: string
}

export default function ProjectImageGallery({ images, title }: Props) {
  const [current, setCurrent] = useState(0)

  if (!images || images.length === 0) return null

  const prev = () => setCurrent((i) => (i - 1 + images.length) % images.length)
  const next = () => setCurrent((i) => (i + 1) % images.length)

  return (
    <div className="relative w-full h-[220px] overflow-hidden">
      {/* Image */}
      <Image
        src={images[current]}
        alt={`${title} — image ${current + 1}`}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
        className="object-cover object-center transition-opacity duration-300"
      />

      {/* Arrows — only shown when multiple images */}
      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-8 h-8 rounded-full cursor-pointer transition-all duration-200 hover:scale-110"
            style={{ background: 'rgba(4,13,26,0.65)', backdropFilter: 'blur(4px)', border: '1px solid rgba(255,255,255,0.15)' }}
            aria-label="Previous image"
          >
            <ChevronLeft size={16} className="text-white" />
          </button>

          <button
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-8 h-8 rounded-full cursor-pointer transition-all duration-200 hover:scale-110"
            style={{ background: 'rgba(4,13,26,0.65)', backdropFilter: 'blur(4px)', border: '1px solid rgba(255,255,255,0.15)' }}
            aria-label="Next image"
          >
            <ChevronRight size={16} className="text-white" />
          </button>

          {/* Dot indicators */}
          <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className="rounded-full cursor-pointer transition-all duration-200"
                style={{
                  width: i === current ? '16px' : '6px',
                  height: '6px',
                  background: i === current ? '#F5A623' : 'rgba(255,255,255,0.5)',
                }}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>

          {/* Counter */}
          <div
            className="absolute top-2.5 right-2.5 z-10 font-mono text-[10px] px-2 py-0.5 rounded-full"
            style={{ background: 'rgba(4,13,26,0.65)', color: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(4px)' }}
          >
            {current + 1} / {images.length}
          </div>
        </>
      )}
    </div>
  )
}
