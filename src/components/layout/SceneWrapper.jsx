import React from 'react'

// Every section of the site is a "scene" in the film. This wrapper is the
// one structural element every scene shares — consistent min-height,
// consistent horizontal rhythm, and the sprocket-hole film-edge motif —
// while `theme` swaps the palette/mood per the brief's adaptive visual system.
const THEMES = {
  opening: 'bg-void text-parchment',
  countdown: 'bg-void text-parchment',
  arcade: 'bg-[#15121C] text-parchment',
  memories: 'bg-gradient-to-b from-dream1 to-dream2 text-ink',
  wrapped: 'bg-[#0E0E14] text-parchment',
  song: 'bg-[#0A0C12] text-parchment',
  openwhen: 'bg-parchment text-ink',
  vault: 'bg-classified text-signal',
  credits: 'bg-void text-parchment',
  finale: 'bg-black text-parchment',
}

export default function SceneWrapper({
  theme = 'opening',
  sceneLabel, // e.g. "SCENE 4" — only used where the brief calls for scene numbering
  className = '',
  children,
  showFilmEdge = true,
}) {
  const themeClass = THEMES[theme] || THEMES.opening

  return (
    <section className={`relative min-h-[100svh] w-full overflow-hidden ${themeClass} ${className}`}>
      {showFilmEdge && (
        <>
          <div className="film-edge pointer-events-none absolute inset-x-0 top-0 h-3 opacity-60" aria-hidden="true" />
          <div className="film-edge pointer-events-none absolute inset-x-0 bottom-0 h-3 opacity-60" aria-hidden="true" />
        </>
      )}

      {sceneLabel && (
        <div className="absolute left-4 top-6 z-10 font-mono text-[10px] uppercase tracking-widest2 text-ash sm:left-8 sm:top-8">
          {sceneLabel}
        </div>
      )}

      <div className="relative z-0 mx-auto flex min-h-[100svh] w-full max-w-6xl flex-col px-5 py-16 sm:px-8">
        {children}
      </div>
    </section>
  )
}
