import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import SceneWrapper from '../components/layout/SceneWrapper'
import { Reveal, Eyebrow, Headline } from '../components/ui/CinematicText'
import { VAULT_EGGS } from '../data/vault'
import { useExperience } from '../context/ExperienceContext'
import { sfx } from '../lib/sfx'

// Fixed scatter so tiles feel hidden-in-plain-sight rather than a tidy grid.
const POSITIONS = [
  { top: '8%', left: '6%', rot: -6 },
  { top: '14%', left: '68%', rot: 5 },
  { top: '38%', left: '20%', rot: 3 },
  { top: '46%', left: '75%', rot: -4 },
  { top: '64%', left: '10%', rot: 7 },
  { top: '72%', left: '60%', rot: -3 },
  { top: '86%', left: '35%', rot: 4 },
]

function EggFile({ egg, found, onFind, pos }) {
  return (
    <button
      onClick={() => !found && onFind(egg.id)}
      className="absolute w-40 -translate-x-1/2 -translate-y-1/2 rounded border border-signal/25 bg-classified/70 px-3 py-3 text-left backdrop-blur-sm transition hover:border-signal"
      style={{ top: pos.top, left: pos.left, transform: `translate(-50%, -50%) rotate(${pos.rot}deg)` }}
    >
      {found ? (
        <>
          <p className="font-mono text-[9px] uppercase tracking-widest2 text-signal/60">you found one 👀</p>
          <p className="mt-1 font-mono text-xs text-signal">{egg.phrase}</p>
        </>
      ) : (
        <p className="font-mono text-xs uppercase tracking-widest2 text-signal/50">[ classified file ]</p>
      )}
    </button>
  )
}

export default function VaultScene() {
  const { easterEggsFound, addEasterEgg } = useExperience()
  const [show3739, setShow3739] = useState(false)

  const allFound = easterEggsFound.length === VAULT_EGGS.length

  const handleFind = (id) => {
    const wasAlreadyFound = easterEggsFound.includes(id)
    addEasterEgg(id)
    if (!wasAlreadyFound) {
      sfx.unlock()
      if (easterEggsFound.length + 1 === VAULT_EGGS.length) {
        setTimeout(() => sfx.chime(), 300)
      }
    }
  }

  return (
    <SceneWrapper theme="vault" sceneLabel="ACCESS RESTRICTED">
      <div className="grain relative flex flex-1 flex-col items-center gap-8 py-6">
        <Reveal className="text-center">
          <Eyebrow className="text-signal/60">seven files. all classified.</Eyebrow>
          <Headline className="mt-2 text-signal">THE VAULT.</Headline>
          <p className="mt-2 font-mono text-xs text-signal/50">
            {easterEggsFound.length} / {VAULT_EGGS.length} found
          </p>
        </Reveal>

        <div className="relative h-[420px] w-full max-w-2xl flex-1 sm:h-[480px]">
          {VAULT_EGGS.map((egg, i) => (
            <EggFile
              key={egg.id}
              egg={egg}
              pos={POSITIONS[i]}
              found={easterEggsFound.includes(egg.id)}
              onFind={handleFind}
            />
          ))}
        </div>

        {allFound && (
          <Reveal className="text-center">
            <p className="font-mono text-sm text-signal">7 / 7</p>
            <p className="mt-1 font-display text-xl italic text-signal">
              You found all our nonsense. ❤️
            </p>
          </Reveal>
        )}

        <button
          onClick={() => {
            sfx.click()
            setShow3739((s) => !s)
          }}
          className="font-mono text-[10px] uppercase tracking-widest2 text-signal/30 hover:text-signal/70"
        >
          {show3739 ? 'close' : '37 + 39 →'}
        </button>

        {show3739 && (
          <Reveal className="max-w-sm text-center">
            <p className="font-display text-4xl text-signal/80">
              37 <span className="text-signal/30">+</span>{' '}
              <span className="text-ember">39</span>
            </p>
            <p className="mt-2 font-mono text-xs text-signal/50">two register numbers. one story.</p>
            <p className="mt-6 font-display text-2xl italic text-ember">39 ❤️</p>
            <p className="mt-1 font-mono text-xs text-signal/50">
              your favorite number. because it belongs to Baby.
            </p>
          </Reveal>
        )}

        <Reveal delay={600}>
          <Link
            to="/credits"
            className="mt-2 inline-block rounded-full border border-signal/25 px-6 py-3 font-mono text-xs uppercase tracking-widest2 text-signal/70 transition hover:border-signal hover:text-signal"
          >
            roll credits →
          </Link>
        </Reveal>
      </div>
    </SceneWrapper>
  )
}
