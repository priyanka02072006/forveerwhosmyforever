import React from 'react'
import { Link } from 'react-router-dom'
import SceneWrapper from '../components/layout/SceneWrapper'
import { Reveal, Eyebrow, Headline } from '../components/ui/CinematicText'
import RagebaitReflex from '../games/RagebaitReflex'
import SurviveMyRagebait from '../games/SurviveMyRagebait'
import CatchTheKisses from '../games/CatchTheKisses'
import WouldBabyRather from '../games/WouldBabyRather'
import { useExperience } from '../context/ExperienceContext'

export default function ArcadeScene() {
  const { unlocked } = useExperience()

  return (
    <SceneWrapper theme="arcade" sceneLabel="TINY ARCADE">
      <div className="flex flex-1 flex-col items-center justify-center gap-10">
        <Reveal className="text-center">
          <Eyebrow>while you wait</Eyebrow>
          <Headline className="mt-2">Games I'm basically playing with you.</Headline>
        </Reveal>

        <Reveal delay={200} className="grid w-full max-w-3xl grid-cols-1 gap-5 sm:grid-cols-2">
          <RagebaitReflex />
          <SurviveMyRagebait />
          <CatchTheKisses />
          <WouldBabyRather />
        </Reveal>

        <Reveal delay={400}>
          {unlocked ? (
            <Link to="/quiz" className="font-mono text-xs uppercase tracking-widest2 text-ash hover:text-ember">
              the real games are unlocked → find them in the menu
            </Link>
          ) : (
            <Link to="/" className="font-mono text-xs uppercase tracking-widest2 text-ash hover:text-ember">
              ← back to the countdown
            </Link>
          )}
        </Reveal>
      </div>
    </SceneWrapper>
  )
}
