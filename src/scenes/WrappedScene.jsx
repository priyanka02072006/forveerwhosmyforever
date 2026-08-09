import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import SceneWrapper from '../components/layout/SceneWrapper'
import { Eyebrow } from '../components/ui/CinematicText'
import { WRAPPED_CARDS } from '../data/wrapped'

const BG = {
  wrapped1: 'from-wrapped1 to-[#8a2540]',
  wrapped2: 'from-wrapped2 to-[#a86a1a]',
  wrapped3: 'from-wrapped3 to-[#2a2a8a]',
}

export default function WrappedScene() {
  const [i, setI] = useState(0)
  const card = WRAPPED_CARDS[i]
  const isLast = i === WRAPPED_CARDS.length - 1

  const next = () => setI((v) => Math.min(v + 1, WRAPPED_CARDS.length - 1))
  const prev = () => setI((v) => Math.max(v - 1, 0))

  return (
    <SceneWrapper theme="wrapped" sceneLabel="VEER WRAPPED" showFilmEdge={false}>
      <div className="flex flex-1 flex-col items-center justify-center gap-8">
        <div className="flex w-full max-w-sm gap-1.5">
          {WRAPPED_CARDS.map((_, idx) => (
            <div key={idx} className="h-1 flex-1 overflow-hidden rounded-full bg-parchment/15">
              <div
                className={`h-full bg-parchment transition-all ${idx <= i ? 'w-full' : 'w-0'}`}
              />
            </div>
          ))}
        </div>

        <div
          key={i}
          onClick={next}
          className={`relative flex aspect-[9/16] w-full max-w-sm cursor-pointer flex-col justify-between overflow-hidden rounded-3xl bg-gradient-to-br ${BG[card.color]} p-8 shadow-2xl animate-[fadeIn_0.4s_ease]`}
        >
          <Eyebrow className="text-white/70">
            {card.kind === 'stat' ? '2026, statistically' : card.kind === 'most' ? 'superlative' : 'from Baby'}
          </Eyebrow>

          <div className="flex flex-1 flex-col justify-center gap-3">
            <p className="font-mono text-xs uppercase tracking-widest2 text-white/80">{card.label}</p>
            <p className="font-display text-4xl font-semibold leading-tight text-white sm:text-5xl">
              {card.value}
            </p>
          </div>

          <p className="font-mono text-[10px] uppercase tracking-widest2 text-white/50">
            tap to continue
          </p>
        </div>

        <div className="flex w-full max-w-sm items-center justify-between">
          <button
            onClick={prev}
            disabled={i === 0}
            className="font-mono text-xs uppercase tracking-widest2 text-ash disabled:opacity-20"
          >
            ← back
          </button>
          {isLast ? (
            <Link
              to="/open-when"
              className="rounded-full bg-parchment px-5 py-2 font-mono text-xs uppercase tracking-widest2 text-void"
            >
              keep going →
            </Link>
          ) : (
            <button onClick={next} className="font-mono text-xs uppercase tracking-widest2 text-ash">
              next →
            </button>
          )}
        </div>
      </div>
    </SceneWrapper>
  )
}
