import React from 'react'
import { Link } from 'react-router-dom'
import SceneWrapper from '../components/layout/SceneWrapper'
import { Reveal, Eyebrow, Headline } from '../components/ui/CinematicText'

export default function OpeningScene() {
  return (
    <SceneWrapper theme="opening" sceneLabel="CLASSIFIED FILE 22.09.2006">
      <div className="grain relative flex flex-1 flex-col items-center justify-center gap-8 text-center">
        <Reveal>
          <Eyebrow>a message has been received.</Eyebrow>
        </Reveal>
        <Reveal delay={400}>
          <Eyebrow className="text-ember/80">attention, birthday boy.</Eyebrow>
        </Reveal>

        <Reveal delay={900}>
          <Headline className="text-glow">
            Happy Birthday, <span className="italic text-ember">my Baby.</span>
          </Headline>
        </Reveal>

        <Reveal delay={1400} className="max-w-lg">
          <p className="font-display text-lg italic leading-relaxed text-parchment/90 sm:text-xl">
            "Happy Birthday My Baby.. Yo Babygirl a.k.a Mommy wishes you the best
            in everything you wish for in your life"
          </p>
        </Reveal>

        <Reveal delay={1900}>
          <Link
            to="/memories"
            className="mt-4 inline-block rounded-full border border-parchment/25 px-6 py-3 font-mono text-xs uppercase tracking-widest2 text-parchment transition hover:border-ember hover:text-ember"
          >
            step inside →
          </Link>
        </Reveal>
      </div>
    </SceneWrapper>
  )
}