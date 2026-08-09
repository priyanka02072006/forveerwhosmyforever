import React, { useState } from 'react'
import { WOULD_RATHER_ROUNDS } from '../data/arcadeBanter'
import { sfx } from '../lib/sfx'

export default function WouldBabyRather() {
  const [round, setRound] = useState(0)
  const [picked, setPicked] = useState(null) // 'a' | 'b' | null
  const [done, setDone] = useState(false)

  const current = WOULD_RATHER_ROUNDS[round]

  const choose = (key) => {
    setPicked(key)
    sfx.click()
  }

  const advance = () => {
    if (round + 1 >= WOULD_RATHER_ROUNDS.length) {
      setDone(true)
      return
    }
    setRound((r) => r + 1)
    setPicked(null)
  }

  const restart = () => {
    setRound(0)
    setPicked(null)
    setDone(false)
  }

  if (done) {
    return (
      <button
        onClick={restart}
        className="flex h-60 w-full flex-col items-center justify-center gap-2 rounded-2xl bg-wrapped2/80 px-4 text-center font-display text-white"
      >
        <span className="text-2xl">verdict: you're keeping me forever.</span>
        <span className="font-mono text-[10px] uppercase tracking-widest2 opacity-70">tap to play again</span>
      </button>
    )
  }

  return (
    <div className="flex h-60 w-full flex-col justify-between rounded-2xl bg-wrapped2/80 px-4 py-3 text-white">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-widest2 opacity-60">would Baby rather</span>
        <span className="font-mono text-[10px] opacity-60">{round + 1} / {WOULD_RATHER_ROUNDS.length}</span>
      </div>

      {!picked ? (
        <>
          <p className="text-center font-display text-lg leading-snug">{current.prompt}</p>
          <div className="flex flex-col gap-2">
            <button
              onClick={() => choose('a')}
              className="rounded-xl border border-white/25 px-3 py-2 text-sm transition hover:border-white hover:bg-white/10"
            >
              {current.a.label}
            </button>
            <button
              onClick={() => choose('b')}
              className="rounded-xl border border-white/25 px-3 py-2 text-sm transition hover:border-white hover:bg-white/10"
            >
              {current.b.label}
            </button>
          </div>
        </>
      ) : (
        <button onClick={advance} className="flex flex-1 flex-col items-center justify-center gap-3 text-center">
          <span className="font-display text-lg italic">
            Baby: "{current[picked].reaction}"
          </span>
          <span className="font-mono text-[10px] uppercase tracking-widest2 opacity-70">tap to continue</span>
        </button>
      )}
    </div>
  )
}
