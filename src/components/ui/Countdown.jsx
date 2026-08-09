import React from 'react'
import { breakdownCountdown, msUntilUnlock } from '../../lib/unlockDate'

const UNITS = [
  { key: 'days', label: 'days' },
  { key: 'hours', label: 'hrs' },
  { key: 'minutes', label: 'min' },
  { key: 'seconds', label: 'sec' },
]

export default function Countdown({ now }) {
  const parts = breakdownCountdown(msUntilUnlock(now))

  return (
    <div className="flex items-end justify-center gap-4 sm:gap-8" role="timer" aria-live="polite">
      {UNITS.map(({ key, label }) => (
        <div key={key} className="flex flex-col items-center">
          <span className="font-display text-5xl tabular-nums text-parchment sm:text-7xl">
            {String(parts[key]).padStart(2, '0')}
          </span>
          <span className="mt-2 font-mono text-[10px] uppercase tracking-widest2 text-ash">
            {label}
          </span>
        </div>
      ))}
    </div>
  )
}
