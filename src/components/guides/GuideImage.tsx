import Image from 'next/image'

export function GuideImage({
  src,
  alt,
  aspect = 'aspect-video',
  className = '',
  priority = false,
}: {
  src: string
  alt: string
  aspect?: string
  className?: string
  priority?: boolean
}) {
  return (
    <div className={`relative overflow-hidden rounded-xl ${aspect} ${className}`}>
      <Image src={src} alt={alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 800px" priority={priority} />
    </div>
  )
}
