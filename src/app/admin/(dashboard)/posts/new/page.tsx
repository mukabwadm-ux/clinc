import PostForm from '../_components/PostForm'
import { getInternalLinks } from '../_components/internalLinks'

export const dynamic = 'force-dynamic'

export default async function NewPostPage() {
  const internalLinks = await getInternalLinks()
  return <PostForm internalLinks={internalLinks} />
}
