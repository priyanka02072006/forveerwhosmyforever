import React from 'react'
import { Link } from 'react-router-dom'
import SceneWrapper from '../components/layout/SceneWrapper'
import { Eyebrow } from '../components/ui/CinematicText'

const BLOCKS = [
  { role: '', lines: ['PRAVEER & PRIYANKA', 'A Story Still Being Written.'], big: true },
  { role: 'A FILM BY', lines: ['Baby'] },
  { role: '', lines: ['A PP PRODUCTION'] },
  { role: 'STARRING', lines: ['Praveer Raj', 'as Veer'] },
  { role: 'FEATURING', lines: ['His favorite girl', 'as Baby / Babygirl'] },
  { role: 'DIRECTED BY', lines: ['Two idiots who somehow fell in love'] },
  { role: 'PRODUCED BY', lines: ['Late-night calls, FaceTimes & online dates'] },
  { role: 'WRITTEN BY', lines: ['"I love you"', '"Mwaaahhh"', '"Fuck off"'] },
  { role: 'SPECIAL EFFECTS', lines: ["Ragebaiting & pulling each other's legs"] },
  { role: 'CINEMATOGRAPHY', lines: ['10 photos, 1 video & countless uncaptured memories'] },
  { role: 'SOUNDTRACK', lines: ['Do I Clench My Fists — Ridgeclub'] },
  { role: 'SPECIAL THANKS TO', lines: ['Every stupid little moment that became a memory'] },
  { role: 'RELEASE DATE', lines: ['September 22, 2026'] },
  { role: 'RUNTIME', lines: ['Still counting...'] },
]

export default function CreditsScene() {
  return (
    <SceneWrapper theme="credits" sceneLabel="ROLL CREDITS" showFilmEdge={false}>
      <div className="relative flex flex-1 flex-col items-center overflow-hidden">
        <div className="film-edge pointer-events-none absolute inset-x-0 top-0 z-10 h-16 bg-gradient-to-b from-void to-transparent" />

        <div className="mt-8 animate-[creditsScroll_50s_linear_forwards] text-center [animation-play-state:running]">
          <style>{`
            @keyframes creditsScroll {
              from { transform: translateY(0); }
              to { transform: translateY(-72%); }
            }
          `}</style>

          {BLOCKS.map((block, i) => (
            <div key={i} className="mb-16 flex flex-col items-center gap-2 px-6">
              {block.role && (
                <Eyebrow className="text-ash">{block.role}</Eyebrow>
              )}
              {block.lines.map((line, j) => (
                <p
                  key={j}
                  className={
                    block.big
                      ? 'font-display text-3xl italic text-parchment sm:text-5xl'
                      : 'font-display text-xl text-parchment/90 sm:text-2xl'
                  }
                >
                  {line}
                </p>
              ))}
            </div>
          ))}

          <Link
            to="/finale"
            className="mb-24 mt-8 inline-block rounded-full border border-parchment/25 px-6 py-3 font-mono text-xs uppercase tracking-widest2 text-parchment transition hover:border-ember hover:text-ember"
          >
            end of chapter one →
          </Link>
        </div>

        <div className="film-edge pointer-events-none absolute inset-x-0 bottom-0 z-10 h-16 bg-gradient-to-t from-void to-transparent" />
      </div>
    </SceneWrapper>
  )
}
