import React, { useCallback, useRef, useState } from 'react'
import { useExperience } from '../context/ExperienceContext'
import { sfx } from '../lib/sfx'
import {
  REFLEX_WAITING,
  REFLEX_EARLY,
  REFLEX_RESULT_FAST,
  REFLEX_RESULT_MID,
  REFLEX_RESULT_SLOW,
} from '../data/arcadeBanter'

const STATES = { idle: 'idle', waiting: 'waiting', ready: 'ready', early: 'early', result: 'result' }
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]

function resultLine(ms) {
  if (ms < 300) return pick(REFLEX_RESULT_FAST)
  if (ms < 500) return pick(REFLEX_RESULT_MID)
  return pick(REFLEX_RESULT_SLOW)
}

export default function RagebaitReflex() {
  const [state, setState] = useState(STATES.idle)
  const [ms, setMs] = useState(null)
  const [line, setLine] = useState(null)
  const startRef = useRef(0)
  const timeoutRef = useRef(null)
  const { recordGameScore, gameScores } = useExperience()
  const best = gameScores.reaction

  const start = useCallback(() => {
    setState(STATES.waiting)
    setLine(pick(REFLEX_WAITING))
    const delay = 1200 + Math.random() * 2200
    timeoutRef.current = setTimeout(() => {
      startRef.current = performance.now()
      setState(STATES.ready)
      sfx.pop()
    }, delay)
  }, [])

  const handleClick = () => {
    if (state === STATES.idle || state === STATES.result || state === STATES.early) {
      start()
      return
    }
    if (state === STATES.waiting) {
      clearTimeout(timeoutRef.current)
      setState(STATES.early)
      setLine(pick(REFLEX_EARLY))
      return
    }
    if (state === STATES.ready) {
      const reaction = Math.round(performance.now() - startRef.current)
      setMs(reaction)
      setState(STATES.result)
      setLine(resultLine(reaction))
      sfx.click()
      if (!best || reaction < best) recordGameScore('reaction', reaction)
    }
  }

  const bg = {
    idle: 'bg-wrapped3/80',
    waiting: 'bg-[#3a2340]',
    ready: 'bg-signal/90',
    early: 'bg-wrapped1/80',
    result: 'bg-wrapped3/80',
  }[state]

  return (
    <button
      onClick={handleClick}
      className={`relative flex h-60 w-full flex-col items-center justify-center gap-3 overflow-hidden rounded-2xl ${bg} px-4 text-center font-display text-white transition-colors duration-150 active:scale-[0.99]`}
    >
      <span className="font-mono text-[10px] uppercase tracking-widest2 opacity-60">ragebait reflex</span>

      {state === STATES.idle && <span className="text-xl">tap to start — I'm timing you.</span>}
      {state === STATES.waiting && <span className="text-lg italic opacity-90">{line}</span>}
      {state === STATES.ready && <span className="text-3xl">TAP NOW</span>}
      {state === STATES.early && (
        <>
          <span className="text-lg">{line}</span>
          <span className="font-mono text-[10px] uppercase tracking-widest2 opacity-60">tap to retry</span>
        </>
      )}
      {state === STATES.result && (
        <>
          <span className="text-3xl tabular-nums">{ms}ms</span>
          <span className="max-w-[85%] text-sm italic opacity-90">Baby: "{line}"</span>
          {best && <span className="font-mono text-[10px] uppercase tracking-widest2 opacity-60">best: {best}ms — tap to retry</span>}
        </>
      )}
    </button>
  )
}
