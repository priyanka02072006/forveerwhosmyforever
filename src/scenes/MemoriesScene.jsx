import React from 'react'
import { Link } from 'react-router-dom'
import SceneWrapper from '../components/layout/SceneWrapper'
import { Reveal, Eyebrow, Headline } from '../components/ui/CinematicText'
import { PHOTOS, VIDEOS } from '../data/media'

// Rotation pattern gives the grid a scattered, scrapbook-pinned feel instead
// of a rigid gallery grid — small, deliberate, not randomized per render.
const ROTATIONS = [-3, 2, -1, 4, -2, 3, -4, 1, -3, 2]

function PhotoCard({ photo, index }) {
  const rotation = ROTATIONS[index % ROTATIONS.length]
  return (
    <div
      className="group relative aspect-[4/5] w-full overflow-hidden rounded-md border-8 border-white bg-ink/5 shadow-lg transition-transform duration-300 hover:z-10 hover:scale-105"
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      {photo.src ? (
        <img src={photo.src} alt={photo.caption} className="h-full w-full object-cover" />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-dream2/60 p-3 text-center">
          <span className="font-mono text-[10px] uppercase tracking-widest2 text-ink/50">
            {photo.id}
          </span>
          <span className="font-hand text-lg text-ink/60">photo pending</span>
        </div>
      )}
    </div>
  )
}

export default function MemoriesScene() {
  return (
    <SceneWrapper theme="memories" sceneLabel="SCENE 3">
      <div className="flex flex-1 flex-col items-center gap-12 py-8">
        <Reveal className="text-center">
          <Eyebrow className="text-ink/50">the archive</Eyebrow>
          <Headline className="mt-2">A cinematic scrapbook of us.</Headline>
          <p className="mx-auto mt-3 max-w-md font-body text-sm text-ink/60">
            First dates, late-night calls, the dumb stuff — pinned here like it matters.
            Because it does.
          </p>
        </Reveal>

        <Reveal delay={200} className="grid w-full max-w-4xl grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-5">
          {PHOTOS.map((photo, i) => (
            <PhotoCard key={photo.id} photo={photo} index={i} />
          ))}
        </Reveal>

        <Reveal delay={400} className="w-full max-w-xl">
          <div className="overflow-hidden rounded-2xl border-8 border-white bg-ink/5 shadow-xl">
            <div className="flex aspect-video items-center justify-center bg-ink/10">
              {VIDEOS.scrapbook.src ? (
                <video src={VIDEOS.scrapbook.src} controls className="h-full w-full object-cover" />
              ) : (
                <div className="flex flex-col items-center gap-2 text-center">
                  <span className="font-mono text-[10px] uppercase tracking-widest2 text-ink/50">
                    {VIDEOS.scrapbook.label}
                  </span>
                  <span className="font-hand text-xl text-ink/60">the scrapbook video goes here</span>
                </div>
              )}
            </div>
          </div>
        </Reveal>

        <Reveal delay={500}>
          <Link
            to="/song"
            className="inline-block rounded-full border border-ink/20 px-6 py-3 font-mono text-xs uppercase tracking-widest2 text-ink/70 transition hover:border-ember hover:text-ember"
          >
            there's a song for this →
          </Link>
        </Reveal>
      </div>
    </SceneWrapper>
  )
}
