'use client'

import { useEffect, useState } from 'react'

export function useCountUp(target: number, duration = 2000, trigger = false) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!trigger) return

    let startTime: number | null = null
    const startValue = 0

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(startValue + (target - startValue) * eased))
      if (progress < 1) requestAnimationFrame(step)
    }

    requestAnimationFrame(step)
  }, [target, duration, trigger])

  return count
}
