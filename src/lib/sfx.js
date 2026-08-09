// Tiny Web Audio synthesizer for interaction sounds — deliberately NOT audio
// files, so there's nothing to source or license for a handful of clicks and
// chimes. Used sparingly per the brief: playful in games, unlock/glitch in
// the vault, near-silent in romantic sections.
let ctx = null
function getCtx() {
  if (typeof window === 'undefined') return null
  if (!ctx) {
    const AC = window.AudioContext || window.webkitAudioContext
    if (!AC) return null
    ctx = new AC()
  }
  return ctx
}

function tone({ freq = 440, duration = 0.12, type = 'sine', gain = 0.05, delay = 0 }) {
  const audioCtx = getCtx()
  if (!audioCtx) return
  if (audioCtx.state === 'suspended') audioCtx.resume()

  const osc = audioCtx.createOscillator()
  const g = audioCtx.createGain()
  osc.type = type
  osc.frequency.value = freq
  g.gain.value = 0
  osc.connect(g)
  g.connect(audioCtx.destination)

  const start = audioCtx.currentTime + delay
  g.gain.linearRampToValueAtTime(gain, start + 0.01)
  g.gain.exponentialRampToValueAtTime(0.0001, start + duration)
  osc.start(start)
  osc.stop(start + duration + 0.02)
}

export const sfx = {
  click: () => tone({ freq: 340, duration: 0.06, type: 'triangle', gain: 0.04 }),
  pop: () => tone({ freq: 520, duration: 0.09, type: 'sine', gain: 0.06 }),
  unlock: () => {
    tone({ freq: 300, duration: 0.1, type: 'square', gain: 0.03 })
    tone({ freq: 600, duration: 0.14, type: 'sine', gain: 0.05, delay: 0.08 })
  },
  chime: () => {
    tone({ freq: 523, duration: 0.4, type: 'sine', gain: 0.05 })
    tone({ freq: 659, duration: 0.4, type: 'sine', gain: 0.04, delay: 0.1 })
    tone({ freq: 784, duration: 0.5, type: 'sine', gain: 0.04, delay: 0.2 })
  },
  paper: () => tone({ freq: 220, duration: 0.08, type: 'sawtooth', gain: 0.015 }),
}
