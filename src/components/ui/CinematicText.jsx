import React, { useEffect, useState } from 'react'

/**
 * A line of text that fades/rises into place, optionally after a delay.
 * This is the single reusable "dramatic reveal" primitive referenced
 * throughout the cinematic sections, so timing and easing stay consistent
 * instead of every scene inventing its own fade.
 */
export function Reveal({ children, delay = 0, as: Tag = 'div', className = '' }) {
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const id = setTimeout(() => setShown(true), delay)
    return () => clearTimeout(id)
  }, [delay])

  return (
    <Tag
      className={`transition-all duration-[1400ms] ease-out ${
        shown ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
      } ${className}`}
    >
      {children}
    </Tag>
  )
}

/** A dim, tracked-out eyebrow label — "A MESSAGE HAS BEEN RECEIVED" style. */
export function Eyebrow({ children, className = '' }) {
  return (
    <p className={`font-mono text-xs uppercase tracking-widest2 text-ash ${className}`}>
      {children}
    </p>
  )
}

/** The big cinematic display line. */
export function Headline({ children, className = '' }) {
  return (
    <h1 className={`font-display text-4xl leading-[1.05] tracking-tight sm:text-6xl ${className}`}>
      {children}
    </h1>
  )
}
