import React from 'react'
import SceneWrapper from '../components/layout/SceneWrapper'
import { Reveal, Eyebrow, Headline } from '../components/ui/CinematicText'

/**
 * Every act gets a themed placeholder so navigation, layout and typography
 * are already correct before real content is written in the next phase.
 * Swap this out per-section as each act is built — nothing else needs to
 * change since SceneWrapper + ExploreMenu already route here.
 */
export default function PlaceholderScene({ theme, sceneLabel, eyebrow, title, note }) {
  return (
    <SceneWrapper theme={theme} sceneLabel={sceneLabel}>
      <div className="relative flex flex-1 flex-col items-center justify-center gap-6 text-center">
        <Reveal>
          <Eyebrow className={theme === 'openwhen' || theme === 'memories' ? 'text-ink/60' : undefined}>
            {eyebrow}
          </Eyebrow>
        </Reveal>
        <Reveal delay={200}>
          <Headline>{title}</Headline>
        </Reveal>
        {note && (
          <Reveal delay={500}>
            <p className="max-w-md font-body text-sm opacity-60">{note}</p>
          </Reveal>
        )}
      </div>
    </SceneWrapper>
  )
}
