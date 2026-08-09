// ────────────────────────────────────────────────────────────────
// HOW TO REPLACE PLACEHOLDERS
// 1. Drop your real files into src/assets/photos, src/assets/videos,
//    src/assets/audio (folders already exist).
// 2. Import them at the top of this file, e.g.
//      import firstDate from '../assets/photos/first-date.jpg'
// 3. Swap the `src` (and `caption`) below for the matching placeholder.
// Nothing else in the app needs to change — every scene reads from here.
// ────────────────────────────────────────────────────────────────

export const SONG = {
  title: 'Do I Clench My Fists',
  artist: 'Ridgeclub',
  // Put the real audio file at src/assets/audio/our-song.mp3 and update this path.
  src: '/media-todo/our-song.mp3',
}

export const PHOTOS = Array.from({ length: 10 }, (_, i) => ({
  id: `photo-${i + 1}`,
  src: null, // e.g. import photo1 from '../assets/photos/01.jpg' then use photo1
  caption: 'Placeholder — memory photo pending upload',
}))

export const VIDEOS = {
  scrapbook: {
    id: 'video-1',
    label: 'Video 1 — Memory Scrapbook',
    src: null,
    caption: 'Placeholder — scrapbook video pending upload',
  },
  reveal: {
    id: 'video-2',
    label: 'Video 2 — Birthday Reveal',
    src: null,
    caption: 'Placeholder — reveal video pending upload (do not surface early)',
  },
}

export const VOICE_NOTE = {
  id: 'voice-note',
  label: 'Birthday Voice Note',
  src: null, // 20–30s real recording, added late in the experience
  caption: 'Placeholder — real recording pending upload',
}
