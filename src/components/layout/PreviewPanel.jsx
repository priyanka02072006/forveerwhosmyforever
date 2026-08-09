import React, { useState } from 'react'
import { useExperience } from '../../context/ExperienceContext'
import { exitPreviewSession } from '../../lib/previewMode'

/**
 * Only ever rendered when previewActive is true, which itself only ever
 * becomes true via the ?preview=forveer39 passphrase. A real visitor on a
 * public deploy has no path to seeing this — no button, no link, no hint.
 */
export default function PreviewPanel() {
  const { previewActive, forceMode, setForceMode, unlocked, resetEasterEggs } = useExperience()
  const [collapsed, setCollapsed] = useState(false)

  if (!previewActive) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 w-64 rounded-xl border border-signal/40 bg-classified/95 p-3 font-mono text-xs text-signal shadow-xl backdrop-blur">
      <div className="flex items-center justify-between">
        <span className="uppercase tracking-widest2">creator preview</span>
        <button onClick={() => setCollapsed((c) => !c)} className="opacity-70 hover:opacity-100">
          {collapsed ? '▸' : '▾'}
        </button>
      </div>

      {!collapsed && (
        <div className="mt-3 flex flex-col gap-2">
          <p className="opacity-70">status: {unlocked ? 'birthday unlocked' : 'countdown locked'}</p>

          <div className="flex gap-1">
            {['real', 'countdown', 'birthday'].map((mode) => (
              <button
                key={mode}
                onClick={() => setForceMode(mode)}
                className={`flex-1 rounded border px-2 py-1 ${
                  forceMode === mode ? 'border-signal bg-signal/20' : 'border-signal/30 opacity-60 hover:opacity-100'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>

          <p className="mt-1 opacity-50">
            this never changes the real unlock date — only what YOU see in this tab.
          </p>

          <button
            onClick={resetEasterEggs}
            className="mt-1 rounded border border-signal/30 px-2 py-1 text-left hover:border-signal"
          >
            reset easter eggs
          </button>

          <button
            onClick={() => {
              exitPreviewSession()
              window.location.href = '/'
            }}
            className="rounded border border-wrapped1/50 px-2 py-1 text-left text-wrapped1 hover:border-wrapped1"
          >
            exit preview
          </button>
        </div>
      )}
    </div>
  )
}
