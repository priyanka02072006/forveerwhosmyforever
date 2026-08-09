import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import SceneWrapper from '../components/layout/SceneWrapper'
import { Reveal, Eyebrow, Headline } from '../components/ui/CinematicText'
import { useAudio } from '../context/AudioContext'
import PlayPrompt from '../components/audio/PlayPrompt'

function formatTime(s) {
  if (!Number.isFinite(s)) return '0:00'
  const m = Math.floor(s / 60)
  const sec = Math.floor(s % 60).toString().padStart(2, '0')
  return `${m}:${sec}`
}

// Deterministic pseudo-waveform bars — replaced by real audio-reactive data
// later if desired, but this already reacts to isPlaying/progress so it
// doesn't look static.
function useWaveform(count = 48) {
  return useMemo(
    () => Array.from({ length: count }, (_, i) => 18 + Math.round(Math.abs(Math.sin(i * 0.7 + i % 5)) * 46)),
    [count]
  )
}

export default function SongScene() {
  const { song, isPlaying, hasStarted, progress, duration, toggle, seek } = useAudio()
  const bars = useWaveform()
  const pct = duration ? progress / duration : 0

  return (
    <SceneWrapper theme="song" sceneLabel="OUR SONG">
      <div className="grain relative flex flex-1 flex-col items-center justify-center gap-10 text-center">
        <Reveal>
          <Eyebrow>now playing, everywhere you go</Eyebrow>
        </Reveal>

        <Reveal delay={150}>
          <Headline>
            {song.title}
            <span className="mt-2 block font-body text-base font-normal text-ash">{song.artist}</span>
          </Headline>
        </Reveal>

        {!hasStarted ? (
          <Reveal delay={350}>
            <PlayPrompt />
          </Reveal>
        ) : (
          <Reveal delay={350} className="w-full max-w-xl">
            <div className="flex h-24 items-end justify-center gap-[3px]">
              {bars.map((h, i) => {
                const active = i / bars.length <= pct
                return (
                  <span
                    key={i}
                    className={`w-1.5 rounded-full transition-colors ${active ? 'bg-ember' : 'bg-parchment/15'} ${
                      isPlaying ? 'animate-drift' : ''
                    }`}
                    style={{ height: `${h}%`, animationDelay: `${i * 60}ms` }}
                  />
                )
              })}
            </div>

            <div className="mt-6 flex items-center gap-3">
              <span className="font-mono text-xs text-ash">{formatTime(progress)}</span>
              <input
                type="range"
                min={0}
                max={duration || 0}
                value={progress}
                onChange={(e) => seek(Number(e.target.value))}
                className="h-1 flex-1 accent-ember"
                aria-label="Seek"
              />
              <span className="font-mono text-xs text-ash">{formatTime(duration)}</span>
            </div>

            <button
              onClick={toggle}
              className="mt-8 flex h-16 w-16 items-center justify-center rounded-full border border-parchment/25 mx-auto transition hover:border-ember hover:scale-105"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M6 5h4v14H6zM14 5h4v14h-4z" /></svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="ml-1"><path d="M8 5v14l11-7z" /></svg>
              )}
            </button>

            <p className="mt-8 font-body text-xs text-ash">
              Real photos land here in the next act — for now, it's just us and the song.
            </p>

            <Link
              to="/quiz"
              className="mt-8 inline-block rounded-full border border-parchment/25 px-6 py-3 font-mono text-xs uppercase tracking-widest2 text-parchment transition hover:border-ember hover:text-ember"
            >
              okay, one more thing →
            </Link>
          </Reveal>
        )}
      </div>
    </SceneWrapper>
  )
}
