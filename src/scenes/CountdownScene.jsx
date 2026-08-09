import React from 'react'
import { Link } from 'react-router-dom'
import SceneWrapper from '../components/layout/SceneWrapper'
import Countdown from '../components/ui/Countdown'
import { Reveal, Eyebrow, Headline } from '../components/ui/CinematicText'
import { useExperience } from '../context/ExperienceContext'

export default function CountdownScene() {
  const { now } = useExperience()

  return (
    <SceneWrapper theme="countdown" sceneLabel="SCENE 1">
      <div className="grain relative flex flex-1 flex-col items-center justify-center gap-10 text-center">
        <Reveal>
          <Eyebrow>the birthday experience is locked.</Eyebrow>
        </Reveal>

        <Reveal delay={200}>
          <Headline className="text-glow">
            Veer's 20th <span className="italic text-ember">birthday.</span>
          </Headline>
        </Reveal>

        <Reveal delay={500}>
          <Countdown now={now} />
        </Reveal>

        <Reveal delay={800} className="mt-4">
          <p className="max-w-sm font-body text-sm text-ash">
            Something was built for you, Baby. It opens itself at midnight on 22 September — whether you're awake for it or not.
          </p>
        </Reveal>

        <Reveal delay={1100}>
          <Link
            to="/arcade"
            className="mt-2 inline-block rounded-full border border-parchment/25 px-6 py-3 font-mono text-xs uppercase tracking-widest2 text-parchment transition hover:border-ember hover:text-ember"
          >
            While you wait → tiny arcade
          </Link>
        </Reveal>
      </div>
    </SceneWrapper>
  )
}
