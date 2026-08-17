import { createClient, type SupabaseClient } from '@supabase/supabase-js'

// Built on first use rather than at import time, so builds without the
// Supabase env vars (local dev, Preview deployments) don't fail just for
// importing this module — only routes that actually call supabaseAdmin
// need the vars present.
let client: SupabaseClient | null = null

function getClient(): SupabaseClient {
  if (!client) {
    client = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    )
  }
  return client
}

export const supabaseAdmin: SupabaseClient = new Proxy({} as SupabaseClient, {
  get(_target, prop, receiver) {
    return Reflect.get(getClient(), prop, receiver)
  },
})
