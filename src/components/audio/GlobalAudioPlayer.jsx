import React from 'react'
import { useAudio } from '../../context/AudioContext'

function formatTime(s) {
  if (!Number.isFinite(s)) return '0:00'
  const m = Math.floor(s / 60)
  const sec = Math.floor(s % 60).toString().padStart(2, '0')
  return `${m}:${sec}`
}

/**
 * The small persistent bar that follows the visitor across every section
 * once they've pressed Play. It reads/writes the SAME AudioContext instance
 * that the full "Our Song" scene uses, so pausing here, navigating to
 * Memories, then back to Our Song resumes at the exact same position.
 */
export default function GlobalAudioPlayer({ className = '' }) {
  const { song, isPlaying, hasStarted, progress, duration, toggle, seek, volume, setVolume } = useAudio()

  if (!hasStarted) return null

  const pct = duration ? (progress / duration) * 100 : 0

  return (
    <div
      className={`flex items-center gap-3 rounded-full border border-parchment/15 bg-void/70 px-3 py-2 backdrop-blur-md ${className}`}
    >
      <button
        onClick={toggle}
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-parchment/10 text-parchment transition hover:bg-ember/80"
        aria-label={isPlaying ? 'Pause song' : 'Play song'}
      >
        {isPlaying ? (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M6 5h4v14H6zM14 5h4v14h-4z" /></svg>
        ) : (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="ml-0.5"><path d="M8 5v14l11-7z" /></svg>
        )}
      </button>

      <div className="hidden min-w-0 flex-col leading-tight sm:flex">
        <span className="truncate font-body text-xs font-medium text-parchment">{song.title}</span>
        <span className="truncate font-mono text-[10px] uppercase tracking-wide text-ash">{song.artist}</span>
      </div>

      <div className="flex flex-1 items-center gap-2">
        <span className="font-mono text-[10px] text-ash">{formatTime(progress)}</span>
        <input
          type="range"
          min={0}
          max={duration || 0}
          value={progress}
          onChange={(e) => seek(Number(e.target.value))}
          className="h-1 w-24 accent-ember sm:w-32"
          aria-label="Seek"
          style={{ background: `linear-gradient(to right, #C4552E ${pct}%, rgba(243,236,221,0.15) ${pct}%)` }}
        />
        <span className="font-mono text-[10px] text-ash">{formatTime(duration)}</span>
      </div>

      <input
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={volume}
        onChange={(e) => setVolume(Number(e.target.value))}
        className="hidden h-1 w-14 accent-ember md:block"
        aria-label="Volume"
      />
    </div>
  )
}
