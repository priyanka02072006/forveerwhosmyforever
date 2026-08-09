import React, { useEffect, useRef, useState, useCallback } from 'react'
import { useExperience } from '../context/ExperienceContext'
import { sfx } from '../lib/sfx'
import { KISS_CAUGHT_LINES, KISS_MISSED_LINES, DISTRACTION_LINES } from '../data/arcadeBanter'

const DURATION = 15
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]

// A distraction item is his running Samantha-and-Vijay-stalking joke made
// physical: it looks tempting but tapping it costs points, same as him
// getting pulled away mid-conversation. Kisses are the "real" catch.
let uid = 0

export default function CatchTheKisses() {
  const [phase, setPhase] = useState('idle') // idle | playing | done
  const [items, setItems] = useState([])
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(DURATION)
  const [toast, setToast] = useState(null)
  const spawnRef = useRef(null)
  const tickRef = useRef(null)
  const toastRef = useRef(null)
  const { recordGameScore, gameScores } = useExperience()
  const best = gameScores.kisses

  const clearAll = () => {
    clearInterval(spawnRef.current)
    clearInterval(tickRef.current)
    clearTimeout(toastRef.current)
  }
  useEffect(() => () => clearAll(), [])

  const showToast = (text) => {
    clearTimeout(toastRef.current)
    setToast(text)
    toastRef.current = setTimeout(() => setToast(null), 900)
  }

  const spawnItem = useCallback(() => {
    const isDistraction = Math.random() < 0.28
    const id = uid++
    const item = {
      id,
      isDistraction,
      left: 8 + Math.random() * 80, // percent
      duration: 2.6 + Math.random() * 1.2,
    }
    setItems((prev) => [...prev, item])
    setTimeout(() => {
      setItems((prev) => {
        const stillThere = prev.find((p) => p.id === id)
        if (stillThere && !stillThere.isDistraction) {
          // a real kiss expired uncaught
          showToast(pick(KISS_MISSED_LINES))
        }
        return prev.filter((p) => p.id !== id)
      })
    }, item.duration * 1000)
  }, [])

  const start = () => {
    setScore(0)
    setItems([])
    setTimeLeft(DURATION)
    setPhase('playing')
    spawnRef.current = setInterval(spawnItem, 650)
    tickRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearAll()
          setPhase('done')
          return 0
        }
        return t - 1
      })
    }, 1000)
  }

  useEffect(() => {
    if (phase === 'done' && (!best || score > best)) recordGameScore('kisses', score)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase])

  const catchItem = (item) => {
    setItems((prev) => prev.filter((p) => p.id !== item.id))
    if (item.isDistraction) {
      setScore((s) => Math.max(0, s - 2))
      showToast(pick(DISTRACTION_LINES))
      sfx.paper()
    } else {
      setScore((s) => s + 1)
      showToast(pick(KISS_CAUGHT_LINES))
      sfx.pop()
    }
  }

  return (
    <div className="relative flex h-60 w-full flex-col overflow-hidden rounded-2xl bg-[#3a1f34] px-4 py-3 text-white">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-widest2 opacity-60">catch the kisses</span>
        {phase === 'playing' && <span className="font-mono text-[10px] opacity-70">{timeLeft}s</span>}
      </div>

      {phase === 'idle' && (
        <button
          onClick={start}
          className="flex flex-1 flex-col items-center justify-center gap-2 text-center"
        >
          <span className="text-xl font-display">catch my kisses. dodge the distractions.</span>
          <span className="font-mono text-[10px] uppercase tracking-widest2 opacity-70">
            💋 = +1 &nbsp; 📱 = -2 (that's Samantha & Vijay again) &nbsp; tap to start
          </span>
        </button>
      )}

      {phase === 'playing' && (
        <div className="relative flex-1">
          <div className="absolute left-1/2 top-1 -translate-x-1/2 font-display text-3xl font-semibold tabular-nums">
            {score}
          </div>
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => catchItem(item)}
              className="absolute bottom-0 text-3xl"
              style={{
                left: `${item.left}%`,
                animation: `riseUp ${item.duration}s linear forwards`,
              }}
              aria-label={item.isDistraction ? 'distraction' : 'kiss'}
            >
              {item.isDistraction ? '📱' : '💋'}
            </button>
          ))}
          {toast && (
            <div className="pointer-events-none absolute inset-x-0 bottom-1 text-center text-xs italic opacity-90">
              Baby: "{toast}"
            </div>
          )}
          <style>{`
            @keyframes riseUp {
              from { transform: translateY(0); opacity: 0; }
              10% { opacity: 1; }
              90% { opacity: 1; }
              to { transform: translateY(-180px); opacity: 0; }
            }
          `}</style>
        </div>
      )}

      {phase === 'done' && (
        <button onClick={start} className="flex flex-1 flex-col items-center justify-center gap-1 text-center">
          <span className="text-3xl font-display tabular-nums">{score} caught</span>
          <span className="font-mono text-[10px] uppercase tracking-widest2 opacity-70">
            {best ? `best: ${best} — tap to retry` : 'tap to retry'}
          </span>
        </button>
      )}
    </div>
  )
}
