import React from 'react'
import { useExperience } from '../../context/ExperienceContext'
import CountdownScene from '../../scenes/CountdownScene'

/**
 * Wraps any route that must stay locked until the real birthday unlock.
 * This is a REAL gate — unlike a disabled menu button, typing the URL
 * directly can't bypass it. `unlocked` already accounts for an active
 * creator preview session forcing birthday mode, so you (Priyanka) can
 * still reach every scene early via /?preview=forveer39 without opening
 * anything for Veer before the real date.
 */
export default function LockedRoute({ children }) {
  const { unlocked } = useExperience()
  if (!unlocked) return <CountdownScene />
  return children
}
