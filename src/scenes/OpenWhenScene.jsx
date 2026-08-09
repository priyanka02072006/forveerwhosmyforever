import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import SceneWrapper from '../components/layout/SceneWrapper'
import { Reveal, Eyebrow, Headline } from '../components/ui/CinematicText'
import { OPEN_WHEN_LETTERS } from '../data/openWhen'
import { sfx } from '../lib/sfx'

function Envelope({ letter, opened, onOpen }) {
  return (
    <button
      onClick={onOpen}
      className="group flex aspect-[3/2] w-full flex-col items-center justify-center gap-2 rounded-sm border border-ink/15 bg-parchment2/60 px-4 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-md"
    >
      <span className="font-mono text-[9px] uppercase tracking-widest2 text-ink/40">open when</span>
      <span className="font-hand text-xl text-ink sm:text-2xl">{letter.title}</span>
      {opened && <span className="mt-1 font-mono text-[9px] uppercase tracking-widest2 text-ember">read again</span>}
    </button>
  )
}

export default function OpenWhenScene() {
  const [activeId, setActiveId] = useState(null)
  const [openedIds, setOpenedIds] = useState([])

  const active = OPEN_WHEN_LETTERS.find((l) => l.id === activeId)

  const openLetter = (id) => {
    sfx.paper()
    setActiveId(id)
    setOpenedIds((prev) => (prev.includes(id) ? prev : [...prev, id]))
  }

  return (
    <SceneWrapper theme="openwhen" sceneLabel="OPEN WHEN">
      <div className="flex flex-1 flex-col items-center gap-10 py-8">
        <Reveal className="text-center">
          <Eyebrow className="text-ink/50">a small stack of envelopes</Eyebrow>
          <Headline className="mt-2 font-hand text-5xl sm:text-6xl">Open when...</Headline>
        </Reveal>

        <Reveal delay={200} className="grid w-full max-w-2xl grid-cols-2 gap-4 sm:grid-cols-3">
          {OPEN_WHEN_LETTERS.map((letter) => (
            <Envelope
              key={letter.id}
              letter={letter}
              opened={openedIds.includes(letter.id)}
              onOpen={() => openLetter(letter.id)}
            />
          ))}
        </Reveal>

        <p className="font-mono text-[10px] uppercase tracking-widest2 text-ink/30">
          {openedIds.length} / {OPEN_WHEN_LETTERS.length} opened
        </p>

        <Reveal delay={400}>
          <Link
            to="/20-things"
            className="inline-block rounded-full border border-ink/20 px-6 py-3 font-mono text-xs uppercase tracking-widest2 text-ink/70 transition hover:border-ember hover:text-ember"
          >
            keep going →
          </Link>
        </Reveal>
      </div>

      {active && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-6 backdrop-blur-sm"
          onClick={() => setActiveId(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[80vh] w-full max-w-md overflow-y-auto rounded-sm bg-parchment p-8 shadow-2xl animate-[fadeIn_0.3s_ease]"
          >
            <button
              onClick={() => setActiveId(null)}
              className="absolute right-4 top-4 font-mono text-xs text-ink/40 hover:text-ink"
              aria-label="Close letter"
            >
              ✕
            </button>
            <p className="mb-4 font-mono text-[10px] uppercase tracking-widest2 text-ink/40">
              open when {active.title}
            </p>
            <p className="whitespace-pre-line font-hand text-2xl leading-relaxed text-ink">
              {active.body}
            </p>
          </div>
        </div>
      )}
    </SceneWrapper>
  )
}
