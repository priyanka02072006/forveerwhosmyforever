import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react'
import { UNLOCK_DATE, isUnlocked as isUnlockedReal } from '../lib/unlockDate'
import { checkAndStorePreviewFromUrl, isPreviewSession } from '../lib/previewMode'

const ExperienceContext = createContext(null)

// Preview force-modes. 'real' means "don't override anything, behave exactly
// like a real visitor" — used so the creator can also sanity-check the real
// countdown without leaving preview.
const FORCE_MODES = ['real', 'countdown', 'birthday']

export function ExperienceProvider({ children }) {
  const [previewActive, setPreviewActive] = useState(false)
  const [forceMode, setForceMode] = useState('real')
  const [simulatedNow, setSimulatedNow] = useState(null) // Date | null

  const [tick, setTick] = useState(() => new Date())

  const [easterEggsFound, setEasterEggsFound] = useState(() => loadJSON('forveer_eggs', []))
  const [quizScore, setQuizScore] = useState(() => loadJSON('forveer_quiz', null))
  const [gameScores, setGameScores] = useState(() => loadJSON('forveer_games', {}))

  useEffect(() => {
    const active = checkAndStorePreviewFromUrl()
    setPreviewActive(active)
  }, [])

  useEffect(() => {
    const id = setInterval(() => setTick(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    saveJSON('forveer_eggs', easterEggsFound)
  }, [easterEggsFound])

  useEffect(() => {
    saveJSON('forveer_quiz', quizScore)
  }, [quizScore])

  useEffect(() => {
    saveJSON('forveer_games', gameScores)
  }, [gameScores])

  // The effective "now" used for every unlock decision in the app.
  // Real visitors always get real wall-clock time. Only an active preview
  // session with an explicit forceMode can bend it, and that never touches
  // the real UNLOCK_DATE or any other visitor's session.
  const effectiveNow = useMemo(() => {
    if (previewActive && forceMode !== 'real' && simulatedNow) return simulatedNow
    return tick
  }, [previewActive, forceMode, simulatedNow, tick])

  const unlocked = useMemo(() => {
    if (previewActive) {
      if (forceMode === 'birthday') return true
      if (forceMode === 'countdown') return false
    }
    return isUnlockedReal(effectiveNow)
  }, [previewActive, forceMode, effectiveNow])

  const addEasterEgg = useCallback((id) => {
    setEasterEggsFound((prev) => (prev.includes(id) ? prev : [...prev, id]))
  }, [])

  const resetEasterEggs = useCallback(() => setEasterEggsFound([]), [])

  const recordGameScore = useCallback((gameId, score) => {
    setGameScores((prev) => ({ ...prev, [gameId]: score }))
  }, [])

  const value = {
    now: effectiveNow,
    unlockDate: UNLOCK_DATE,
    unlocked,
    previewActive,
    forceMode,
    setForceMode: (m) => FORCE_MODES.includes(m) && setForceMode(m),
    setSimulatedNow,
    isPreviewSession,
    easterEggsFound,
    addEasterEgg,
    resetEasterEggs,
    quizScore,
    setQuizScore,
    gameScores,
    recordGameScore,
  }

  return <ExperienceContext.Provider value={value}>{children}</ExperienceContext.Provider>
}

export function useExperience() {
  const ctx = useContext(ExperienceContext)
  if (!ctx) throw new Error('useExperience must be used inside ExperienceProvider')
  return ctx
}

function loadJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

function saveJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* storage unavailable — fail silently, this is a nice-to-have */
  }
}
