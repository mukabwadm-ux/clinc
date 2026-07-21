import QuotesManager from './_components/QuotesManager'
import { supabaseAdmin } from '@/lib/supabaseAdmin'

export default async function QuotesPage() {
  const { data: initialQuotes } = await supabaseAdmin
    .from('quotes')
    .select('*')
    .order('created_at', { ascending: false })

  return <QuotesManager initialQuotes={initialQuotes ?? []} />
}
