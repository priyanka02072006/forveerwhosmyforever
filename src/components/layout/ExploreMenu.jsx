import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useExperience } from '../../context/ExperienceContext'
import GlobalAudioPlayer from '../audio/GlobalAudioPlayer'

const ITEMS = [
  { label: 'Arcade', path: '/arcade' },
  { label: 'Baby Quiz', path: '/quiz' },
  { label: 'Memories', path: '/memories' },
  { label: 'Our Song', path: '/song' },
  { label: 'Veer Wrapped', path: '/wrapped' },
  { label: 'Open When', path: '/open-when' },
  { label: '20 Things', path: '/20-things' },
  { label: 'Secret Vault', path: '/vault' },
  { label: 'Birthday Credits', path: '/credits' },
]

/**
 * A quiet corner trigger rather than a fixed top navbar — it only expands
 * into a full sheet when tapped, so it never competes with each scene's own
 * cinematic composition. Only reachable once the birthday experience is
 * unlocked (there is nothing to "explore" during countdown besides Arcade).
 */
export default function ExploreMenu() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { unlocked } = useExperience()

  const go = (path) => {
    setOpen(false)
    navigate(path)
  }

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed right-4 top-4 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-parchment/20 bg-void/60 text-parchment backdrop-blur-md transition hover:border-ember sm:right-6 sm:top-6"
        aria-label={open ? 'Close menu' : 'Open explore menu'}
        aria-expanded={open}
      >
        <span className="font-mono text-[11px]">{open ? '✕' : 'MENU'}</span>
      </button>

      <div className="fixed bottom-4 left-4 z-40 sm:bottom-6 sm:left-6">
        <GlobalAudioPlayer />
      </div>

      {open && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-void/95 backdrop-blur-xl animate-[fadeIn_0.3s_ease]">
          <nav className="flex w-full max-w-md flex-col items-center gap-1 px-6">
            <p className="mb-6 font-mono text-[10px] uppercase tracking-widest2 text-ash">
              explore the film
            </p>
            {ITEMS.map((item) => {
              const disabled = !unlocked && item.path !== '/arcade'
              const active = location.pathname === item.path
              return (
                <button
                  key={item.path}
                  disabled={disabled}
                  onClick={() => go(item.path)}
                  className={`w-full rounded-lg px-4 py-3 text-center font-display text-2xl transition
                    ${active ? 'text-ember' : 'text-parchment'}
                    ${disabled ? 'cursor-not-allowed opacity-30' : 'hover:text-ember'}`}
                >
                  {item.label}
                  {disabled && <span className="ml-2 font-mono text-[10px] align-middle text-ash">locked</span>}
                </button>
              )
            })}
          </nav>
        </div>
      )}
    </>
  )
}
