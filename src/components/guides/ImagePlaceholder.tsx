import { ImageIcon } from 'lucide-react'

/**
 * Reserves a spot for an image that isn't sourced yet — matches where the
 * original reference document had a diagram or photo. Swap for a real
 * <Image> once the asset exists; the label says what should go there.
 */
export function ImagePlaceholder({
  label,
  dark = false,
  aspect = 'aspect-[16/9]',
  className = '',
}: {
  label: string
  dark?: boolean
  aspect?: string
  className?: string
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed text-center px-4 ${aspect} ${className}`}
      style={{
        borderColor: dark ? 'rgba(255,255,255,0.15)' : 'rgba(26,43,94,0.15)',
        background: dark ? 'rgba(255,255,255,0.02)' : 'rgba(26,43,94,0.02)',
      }}
    >
      <ImageIcon size={20} style={{ color: dark ? 'rgba(255,255,255,0.3)' : 'rgba(26,43,94,0.25)' }} />
      <p className="text-xs font-medium leading-snug" style={{ color: dark ? 'rgba(255,255,255,0.4)' : 'rgba(26,43,94,0.4)' }}>
        {label}
      </p>
    </div>
  )
}
