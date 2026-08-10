'use client'

import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import type { ActivityPayload } from '@/app/api/admin/activity/route'

/** How often to re-poll while the tab is visible. */
const POLL_MS = 10_000

type ActivityContextValue = {
  data: ActivityPayload | null
  error: boolean
  refresh: () => void
}

const ActivityContext = createContext<ActivityContextValue>({
  data: null,
  error: false,
  refresh: () => {},
})

export function useActivity() {
  return useContext(ActivityContext)
}

export default function ActivityProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<ActivityPayload | null>(null)
  const [error, setError] = useState(false)
  // Guards against overlapping requests when a refresh lands mid-poll.
  const inFlight = useRef(false)

  const refresh = useCallback(async () => {
    if (inFlight.current) return
    inFlight.current = true
    try {
      const res = await fetch('/api/admin/activity', { cache: 'no-store' })
      if (!res.ok) throw new Error('bad status')
      setData(await res.json())
      setError(false)
    } catch {
      setError(true)
    } finally {
      inFlight.current = false
    }
  }, [])

  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | undefined

    const start = () => {
      if (timer) return
      timer = setInterval(refresh, POLL_MS)
    }
    const stop = () => {
      if (timer) clearInterval(timer)
      timer = undefined
    }

    // Polling a hidden tab wastes function invocations; catch up on return.
    const onVisibility = () => {
      if (document.visibilityState === 'visible') {
        void refresh()
        start()
      } else {
        stop()
      }
    }

    void refresh()
    start()
    document.addEventListener('visibilitychange', onVisibility)
    window.addEventListener('focus', refresh)

    return () => {
      stop()
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('focus', refresh)
    }
  }, [refresh])

  return (
    <ActivityContext.Provider value={{ data, error, refresh }}>
      {children}
    </ActivityContext.Provider>
  )
}
