import React, { createContext, useContext, useEffect, useRef, useState, useCallback } from 'react'
import { SONG } from '../data/media'

const AudioCtx = createContext(null)

// There is exactly one <audio> element for the entire app lifetime, created
// once here and never remounted by route/section changes. Every section
// that wants "the song" reads from this context instead of rendering its
// own <audio> tag — that's what keeps position/volume/play-state intact
// when the user wanders from Countdown -> Arcade -> Our Song, etc.
export function AudioProvider({ children }) {
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasStarted, setHasStarted] = useState(false) // has the user ever pressed Play
  const [progress, setProgress] = useState(0) // seconds
  const [duration, setDuration] = useState(0)
  const [volume, setVolumeState] = useState(0.7)

  useEffect(() => {
    const audio = new Audio(SONG.src)
    audio.preload = 'metadata'
    audio.volume = volume
    audioRef.current = audio

    const onTime = () => setProgress(audio.currentTime)
    const onLoaded = () => setDuration(audio.duration || 0)
    const onEnd = () => setIsPlaying(false)

    audio.addEventListener('timeupdate', onTime)
    audio.addEventListener('loadedmetadata', onLoaded)
    audio.addEventListener('ended', onEnd)

    return () => {
      audio.removeEventListener('timeupdate', onTime)
      audio.removeEventListener('loadedmetadata', onLoaded)
      audio.removeEventListener('ended', onEnd)
      audio.pause()
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps -- intentionally created exactly once

  const play = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.play().then(() => {
      setIsPlaying(true)
      setHasStarted(true)
    }).catch(() => {
      // Autoplay was blocked or the file isn't in place yet — surface
      // nothing scary, the Press Play prompt just stays visible.
    })
  }, [])

  const pause = useCallback(() => {
    audioRef.current?.pause()
    setIsPlaying(false)
  }, [])

  const toggle = useCallback(() => {
    if (isPlaying) pause()
    else play()
  }, [isPlaying, play, pause])

  const seek = useCallback((seconds) => {
    if (!audioRef.current) return
    audioRef.current.currentTime = seconds
    setProgress(seconds)
  }, [])

  const setVolume = useCallback((v) => {
    const clamped = Math.min(1, Math.max(0, v))
    if (audioRef.current) audioRef.current.volume = clamped
    setVolumeState(clamped)
  }, [])

  const value = {
    song: SONG,
    isPlaying,
    hasStarted,
    progress,
    duration,
    volume,
    play,
    pause,
    toggle,
    seek,
    setVolume,
  }

  return <AudioCtx.Provider value={value}>{children}</AudioCtx.Provider>
}

export function useAudio() {
  const ctx = useContext(AudioCtx)
  if (!ctx) throw new Error('useAudio must be used inside AudioProvider')
  return ctx
}
