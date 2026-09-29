import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Clock, FileText } from 'lucide-react'
import { POST_TYPE_LABEL, formatDate, type PostCard as PostCardData } from '@/lib/blog/shared'

export function PostTypeBadge({ type }: { type: PostCardData['type'] }) {
  const isArticle = type === 'article'
  return (
    <span
      className="inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest"
      style={{
        background: isArticle ? 'rgba(0,112,192,0.10)' : 'rgba(245,166,35,0.12)',
        color: isArticle ? '#0070C0' : '#B45309',
      }}
    >
      {POST_TYPE_LABEL[type]}
    </span>
  )
}

export function PostMeta({ post }: { post: Pick<PostCardData, 'published_at' | 'reading_minutes'> }) {
  return (
    <p className="flex items-center gap-2 text-xs" style={{ color: '#8899AE' }}>
      <time dateTime={post.published_at ?? undefined}>{formatDate(post.published_at)}</time>
      <span aria-hidden="true">·</span>
      <span className="inline-flex items-center gap-1">
        <Clock size={11} /> {post.reading_minutes} min read
      </span>
    </p>
  )
}

function Cover({ post, sizes, priority }: { post: PostCardData; sizes: string; priority?: boolean }) {
  if (post.cover_image_url) {
    return (
      <Image
        src={post.cover_image_url}
        alt={post.cover_image_alt || post.title}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
      />
    )
  }
  return (
    <div className="absolute inset-0 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #0D1B45 0%, #040D1A 100%)' }}>
      <FileText size={28} style={{ color: 'rgba(245,166,35,0.55)' }} />
    </div>
  )
}

export default function PostCard({ post, headingLevel = 'h2' }: { post: PostCardData; headingLevel?: 'h2' | 'h3' }) {
  const Heading = headingLevel
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col rounded-2xl border bg-white overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-[0_8px_32px_rgba(26,43,94,0.09)] hover:border-gold/30"
      style={{ borderColor: 'rgba(26,43,94,0.10)' }}
    >
      <div className="relative aspect-[16/9] overflow-hidden">
        <Cover post={post} sizes="(min-width: 1024px) 320px, (min-width: 640px) 50vw, 100vw" />
      </div>
      <div className="flex flex-col flex-1 p-6">
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <PostTypeBadge type={post.type} />
          <span className="font-mono text-[10px] uppercase tracking-widest" style={{ color: '#8899AE' }}>{post.category}</span>
        </div>
        <Heading className="font-sans font-black text-lg leading-snug mb-2" style={{ color: '#1A2B5E' }}>{post.title}</Heading>
        {post.excerpt && (
          <p className="text-sm leading-relaxed mb-4 line-clamp-3" style={{ color: '#6B7A99' }}>{post.excerpt}</p>
        )}
        <div className="mt-auto flex items-center justify-between gap-3 pt-2">
          <PostMeta post={post} />
          <ArrowRight size={15} className="shrink-0 transition-transform group-hover:translate-x-0.5" style={{ color: '#0070C0' }} />
        </div>
      </div>
    </Link>
  )
}

export function FeaturedPostCard({ post }: { post: PostCardData }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group grid grid-cols-1 md:grid-cols-2 rounded-2xl border bg-white overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-[0_8px_32px_rgba(26,43,94,0.09)] hover:border-gold/30"
      style={{ borderColor: 'rgba(26,43,94,0.10)' }}
    >
      <div className="relative aspect-[16/9] md:aspect-auto md:min-h-[320px] overflow-hidden">
        <Cover post={post} sizes="(min-width: 768px) 512px, 100vw" priority />
      </div>
      <div className="flex flex-col p-6 sm:p-8 lg:p-10">
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <span className="font-mono text-[10px] uppercase tracking-[3px]" style={{ color: '#F5A623' }}>Featured</span>
          <span className="h-px w-5" style={{ background: 'rgba(26,43,94,0.15)' }} />
          <PostTypeBadge type={post.type} />
          <span className="font-mono text-[10px] uppercase tracking-widest" style={{ color: '#8899AE' }}>{post.category}</span>
        </div>
        <h2 className="font-sans font-black leading-tight mb-3" style={{ fontSize: 'clamp(22px, 2.8vw, 32px)', color: '#1A2B5E' }}>
          {post.title}
        </h2>
        {post.excerpt && <p className="text-sm sm:text-base leading-relaxed mb-6" style={{ color: '#6B7A99' }}>{post.excerpt}</p>}
        <div className="mt-auto flex items-center justify-between gap-4">
          <PostMeta post={post} />
          <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest" style={{ color: '#0070C0' }}>
            Read <ArrowRight size={13} />
          </span>
        </div>
      </div>
    </Link>
  )
}
