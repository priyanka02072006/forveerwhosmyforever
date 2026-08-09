import React from 'react'
import { useAudio } from '../../context/AudioContext'
import { Eyebrow } from '../ui/CinematicText'

/**
 * The intentional, user-initiated play button. Nothing in this app calls
 * audio.play() on mount or on route change — this is the ONLY place a play
 * action originates from the birthday-opening flow, satisfying "no autoplay
 * before user interaction."
 */
export default function PlayPrompt({ onPressed }) {
  const { play, hasStarted } = useAudio()

  if (hasStarted) return null

  const handlePress = () => {
    play()
    onPressed?.()
  }

  return (
    <div className="flex flex-col items-center gap-6 text-center">
      <Eyebrow>a little something for you, birthday boy.</Eyebrow>
      <button
        onClick={handlePress}
        className="group relative flex h-20 w-20 items-center justify-center rounded-full border border-parchment/30 transition-all hover:border-ember hover:scale-105 active:scale-95"
        aria-label="Press play"
      >
        <span className="absolute inset-0 rounded-full border border-ember/40 animate-flicker" aria-hidden="true" />
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="ml-1 text-parchment group-hover:text-ember">
          <path d="M8 5v14l11-7z" />
        </svg>
      </button>
      <span className="font-display text-sm italic text-ash">press play ❤️</span>
    </div>
  )
}
