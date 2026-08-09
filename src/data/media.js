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
  src: `/media-todo/photos/photo-${i + 1}.jpeg`,
  caption: `Memory ${i + 1}`,
}))

export const VIDEOS = {
  scrapbook: {
    id: 'video-1',
    label: 'Video 1 — Memory Scrapbook',
    src: '/media-todo/videos/scrapbook.mp4',
    caption: 'Our scrapbook video',
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
  src: '/media-todo/voice/voicenote.ogg',
  caption: 'A voice note, just for you',
}