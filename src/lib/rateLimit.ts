interface Entry { count: number; resetAt: number }

const store = new Map<string, Entry>()

// Prune expired entries periodically (no-op in serverless but keeps memory clean in dev)
setInterval(() => {
  const now = Date.now()
  for (const [k, v] of store) if (v.resetAt < now) store.delete(k)
}, 10 * 60 * 1000).unref?.()

export function checkRateLimit(
  key: string,
  maxAttempts = 5,
  windowMs = 15 * 60 * 1000
): { allowed: boolean; retryAfter?: number } {
  const now = Date.now()
  const entry = store.get(key)

  if (!entry || entry.resetAt < now) {
    store.set(key, { count: 1, resetAt: now + windowMs })
    return { allowed: true }
  }
  if (entry.count >= maxAttempts) {
    return { allowed: false, retryAfter: Math.ceil((entry.resetAt - now) / 1000) }
  }
  entry.count++
  return { allowed: true }
}

export function clearRateLimit(key: string) {
  store.delete(key)
}
