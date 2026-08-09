import React, { useState } from 'react'
import SceneWrapper from '../components/layout/SceneWrapper'
import { Reveal, Eyebrow } from '../components/ui/CinematicText'
import { VOICE_NOTE } from '../data/media'
import { sfx } from '../lib/sfx'

const BEATS = [
  'gift',
  'gift-reveal',
  'transition',
  'voice-note',
  'future',
  'climax-1',
  'climax-2',
  'climax-3',
  'climax-4',
  'climax-5',
  'end',
]

export default function FinaleScene() {
  const [i, setI] = useState(0)
  const beat = BEATS[i]
  const next = () => {
    if (beat === 'gift') sfx.chime()
    setI((v) => Math.min(v + 1, BEATS.length - 1))
  }

  return (
    <SceneWrapper theme="finale" sceneLabel="FINAL CLIMAX" showFilmEdge={false}>
      <div
        onClick={beat !== 'voice-note' && beat !== 'end' ? next : undefined}
        className="grain flex flex-1 cursor-pointer flex-col items-center justify-center gap-6 text-center"
      >
        {beat === 'gift' && (
          <Reveal className="flex flex-col items-center gap-6">
            <Eyebrow>you've unlocked your biggest birthday gift.</Eyebrow>
            <div className="flex h-28 w-28 items-center justify-center rounded-2xl border border-ember/40 text-5xl transition hover:scale-105">
              🎁
            </div>
            <span className="font-mono text-[10px] uppercase tracking-widest2 text-ash">tap the box</span>
          </Reveal>
        )}

        {beat === 'gift-reveal' && (
          <Reveal className="max-w-sm">
            <p className="font-display text-2xl italic text-ember">
              "Wanna do 69? Yo Babygirl agrees to it and is also waiting for that day"
            </p>
            <p className="mt-6 font-mono text-[10px] uppercase tracking-widest2 text-ash">tap to continue</p>
          </Reveal>
        )}

        {beat === 'transition' && (
          <Reveal>
            <p className="font-display text-xl italic text-parchment/80">
              Okay... now that I've embarrassed myself...
            </p>
          </Reveal>
        )}

        {beat === 'voice-note' && (
          <Reveal className="flex w-full max-w-sm flex-col items-center gap-4">
            <Eyebrow>a voice note, just for you</Eyebrow>
            {VOICE_NOTE.src ? (
              <audio src={VOICE_NOTE.src} controls className="w-full" />
            ) : (
              <div className="flex w-full flex-col items-center gap-2 rounded-xl border border-parchment/15 px-6 py-8">
                <span className="text-3xl">🎙️</span>
                <span className="font-mono text-[10px] uppercase tracking-widest2 text-ash">
                  voice note pending upload
                </span>
                <span className="max-w-xs font-body text-xs text-ash/70">
                  Drop the real 20–30s recording into src/assets/audio and point
                  VOICE_NOTE.src at it in src/data/media.js
                </span>
              </div>
            )}
            <button
              onClick={next}
              className="mt-2 rounded-full border border-parchment/25 px-6 py-2 font-mono text-xs uppercase tracking-widest2 transition hover:border-ember"
            >
              continue →
            </button>
          </Reveal>
        )}

        {beat === 'future' && (
          <Reveal className="max-w-md">
            <p className="font-display text-lg italic leading-relaxed text-parchment/80">
              I don't know what the future has planned for us. I just know that wherever it takes us, I want my hand in yours when we get there.
              We don't have a perfect story. We have late nights, stupid fights, ridiculous laughter, endless teasing, tiny gestures, and a thousand little moments no one else will ever understand.
              And honestly… I wouldn't trade our kind of love for anything.
            </p>
            <p className="mt-4 font-mono text-[10px] uppercase tracking-widest2 text-ash">
              not a glimpse. it's a promise.
            </p>
          </Reveal>
        )}

        {beat === 'climax-1' && (
          <Reveal className="flex flex-col items-center gap-3">
            <p className="font-mono text-xs uppercase tracking-widest2 text-ash">cut.</p>
            <p className="font-display text-2xl italic text-parchment/70">end of chapter one.</p>
            <p className="font-display text-lg italic text-ash">...but definitely not the story.</p>
          </Reveal>
        )}

        {beat === 'climax-2' && (
          <Reveal>
            <p className="max-w-md font-display text-2xl italic leading-relaxed text-parchment">
              Because out of everyone in this entire world... somehow, I got you.
            </p>
          </Reveal>
        )}

        {beat === 'climax-3' && (
          <Reveal className="flex flex-col items-center gap-3">
            <p className="font-mono text-2xl tracking-widest text-ember">09.02.2026</p>
            <p className="font-mono text-2xl tracking-widest text-ember">22.09.2026</p>
          </Reveal>
        )}

        {beat === 'climax-4' && (
          <Reveal className="flex flex-col items-center gap-3">
            <p className="font-display text-xl italic text-parchment/80">And every day after this...</p>
            <p className="text-glow font-display text-4xl font-semibold text-ember sm:text-5xl">
              I CHOOSE YOU.
            </p>
          </Reveal>
        )}

        {beat === 'climax-5' && (
          <Reveal className="max-w-md">
            <p className="font-display text-xl italic leading-relaxed text-parchment/85">
              And Veer... if you ever forget how loved you are, come back here.
              I'll still be here.
            </p>
            <p className="mt-6 font-display text-base italic text-ash">
              Although... you'll probably ragebait me again tomorrow.
            </p>
          </Reveal>
        )}

        {beat === 'end' && (
          <Reveal className="flex flex-col items-center gap-2">
            <p className="text-glow font-display text-3xl font-semibold text-parchment sm:text-4xl">
              HAPPY 20TH BIRTHDAY, MY BABY. ❤️
            </p>
            <p className="font-display text-lg italic text-parchment/80">I love you.</p>
            <p className="font-display text-lg italic text-parchment/80">Mwaaahhh.</p>
            <p className="mt-4 font-mono text-sm uppercase tracking-widest2 text-ash">
              now fuck off.
            </p>
          </Reveal>
        )}
      </div>
    </SceneWrapper>
  )
}
