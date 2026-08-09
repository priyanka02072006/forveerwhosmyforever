// The one true unlock instant. Everything else — countdown math, whether the
// birthday experience is reachable, which opening plays — derives from this.
// Month is 0-indexed in JS Date, so 8 = September.
export const UNLOCK_DATE = new Date(2026, 8, 22, 0, 0, 0)

export function msUntilUnlock(now = new Date()) {
  return UNLOCK_DATE.getTime() - now.getTime()
}

export function isUnlocked(now = new Date()) {
  return now.getTime() >= UNLOCK_DATE.getTime()
}

// Breaks a millisecond duration into a countdown-friendly shape.
// Clamped at zero so the UI never shows negative numbers.
export function breakdownCountdown(ms) {
  const clamped = Math.max(0, ms)
  const totalSeconds = Math.floor(clamped / 1000)
  const days = Math.floor(totalSeconds / 86400)
  const hours = Math.floor((totalSeconds % 86400) / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60
  return { days, hours, minutes, seconds }
}
