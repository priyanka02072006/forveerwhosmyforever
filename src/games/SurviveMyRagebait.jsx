import React, { useEffect, useRef, useState } from 'react'
import { useExperience } from '../context/ExperienceContext'
import { sfx } from '../lib/sfx'
import { TAP_TAUNTS } from '../data/arcadeBanter'

const DURATION = 10

function currentTaunt(taps) {
  let line = TAP_TAUNTS[0].line
  for (const t of TAP_TAUNTS) {
    if (taps >= t.at) line = t.line
  }
  return line
}

export default function SurviveMyRagebait() {
  const [running, setRunning] = useState(false)
  const [taps, setTaps] = useState(0)
  const [timeLeft, setTimeLeft] = useState(DURATION)
  const intervalRef = useRef(null)
  const { recordGameScore, gameScores } = useExperience()
  const best = gameScores.tap

  useEffect(() => () => clearInterval(intervalRef.current), [])

  const start = () => {
    setTaps(0)
    setTimeLeft(DURATION)
    setRunning(true)
    intervalRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(intervalRef.current)
          setRunning(false)
          return 0
        }
        return t - 1
      })
    }, 1000)
  }

  useEffect(() => {
    if (!running && timeLeft === 0 && taps > 0) {
      if (!best || taps > best) recordGameScore('tap', taps)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running])

  const handleTap = () => {
    if (!running) {
      start()
      return
    }
    setTaps((t) => t + 1)
    sfx.click()
  }

  return (
    <button
      onClick={handleTap}
      className="flex h-60 w-full select-none flex-col items-center justify-center gap-2 rounded-2xl bg-wrapped1/80 px-4 text-center font-display text-white transition active:scale-[0.99]"
    >
      <span className="font-mono text-[10px] uppercase tracking-widest2 opacity-60">survive my ragebait</span>

      {!running && timeLeft === DURATION && (
        <>
          <span className="text-xl">tap as fast as you can. I'll be talking.</span>
          <span className="font-mono text-[10px] uppercase tracking-widest2 opacity-70">tap to begin — 10 seconds</span>
        </>
      )}
      {running && (
        <>
          <span className="text-6xl tabular-nums">{taps}</span>
          <span className="text-sm italic opacity-90">Baby: "{currentTaunt(taps)}"</span>
          <span className="font-mono text-[10px] uppercase tracking-widest2 opacity-70">{timeLeft}s left</span>
        </>
      )}
      {!running && timeLeft === 0 && (
        <>
          <span className="text-4xl tabular-nums">{taps} taps</span>
          <span className="font-mono text-xs uppercase tracking-widest2 opacity-80">
            {best ? `best: ${best} — tap to retry` : 'tap to retry'}
          </span>
        </>
      )}
    </button>
  )
}
