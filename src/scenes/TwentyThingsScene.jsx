import React from 'react'
import { Link } from 'react-router-dom'
import SceneWrapper from '../components/layout/SceneWrapper'
import { Reveal, Eyebrow, Headline } from '../components/ui/CinematicText'
import { TWENTY_THINGS } from '../data/twentyThings'

export default function TwentyThingsScene() {
  return (
    <SceneWrapper theme="memories" sceneLabel="20 THINGS ABOUT YOU">
      <div className="flex flex-1 flex-col items-center gap-10 py-8">
        <Reveal className="text-center">
          <Eyebrow className="text-ink/50">for your 20th</Eyebrow>
          <Headline className="mt-2">20 things about you.</Headline>
        </Reveal>

        <div className="w-full max-w-2xl divide-y divide-ink/10">
          {TWENTY_THINGS.map((thing, i) => (
            <Reveal key={i} delay={Math.min(i * 60, 900)}>
              <div className="flex gap-4 py-4">
                <span className="font-mono text-xs text-ember">{String(i + 1).padStart(2, '0')}</span>
                <p className="font-body text-sm leading-relaxed text-ink/85">{thing}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={1000}>
          <Link
            to="/vault"
            className="mt-4 inline-block rounded-full border border-ink/20 px-6 py-3 font-mono text-xs uppercase tracking-widest2 text-ink/70 transition hover:border-ember hover:text-ember"
          >
            one more thing... →
          </Link>
        </Reveal>
      </div>
    </SceneWrapper>
  )
}
