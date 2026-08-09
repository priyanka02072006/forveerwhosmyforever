# forveer — forever ❤️

Phase 1 foundation for Veer's 20th-birthday experience. This build focuses on
the architecture everything else plugs into — not the full content — per the
brief's own phasing.

## Run it locally

```bash
npm install
npm run dev
```

Then open the printed `localhost` URL. `npm run build` produces a static
`dist/` folder you can host anywhere (Vercel, Netlify, GitHub Pages, etc.) —
there's no backend.

## Design plan (why it looks the way it does)

- **Palette** — `void` (#08090C) is the shared "film stock" background across
  cinematic scenes; `ember` (#C4552E) is the one recurring warm accent, used
  sparingly and deliberately tied to **39** (Baby's number) as the site's
  quiet signature color. Each act then gets its own accent world per the
  brief: vault green (`signal`), wrapped brights, parchment/ink for Open
  When, dream pinks for Memories — so sections feel distinct without
  breaking the whole into unrelated pages.
- **Type** — Fraunces (display serif) carries the cinematic/romantic voice,
  Inter is the body workhorse, JetBrains Mono plays the "classified
  file / data" register (countdown numerals, eyebrows, vault text), and
  Caveat is reserved for the handwritten Open When treatment.
- **Signature motif** — sprocket-hole film edges (`.film-edge`) frame every
  scene, and `SCENE N` / `CLASSIFIED FILE` labels reinforce the "you're
  watching a film" device the whole brief is built around. This is the one
  throughline that keeps eight very different visual moods feeling like one
  product.

## Architecture

```
src/
  context/
    ExperienceContext.jsx   unlock state, preview overrides, easter eggs,
                             quiz/game scores (persisted to localStorage)
    AudioContext.jsx        the ONE <audio> element for the whole app
  lib/
    unlockDate.js           single source of truth for the Sept 22 unlock
    previewMode.js          hidden, passphrase-gated preview session
  components/
    layout/                 SceneWrapper, ExploreMenu, PreviewPanel
    audio/                  PlayPrompt, GlobalAudioPlayer
    ui/                     CinematicText (Reveal/Eyebrow/Headline), Countdown
  scenes/                   one file per "act" (Countdown, Opening, Arcade,
                             Song, + themed placeholders for what's next)
  games/                    ReactionGame, TapChallenge (countdown arcade)
  data/media.js             single registry for the 10 photos / 2 videos /
                             voice note — swap placeholders here only
```

### How the unlock works

`src/lib/unlockDate.js` hardcodes `new Date(2026, 8, 22, 0, 0, 0)`. Every
unlock decision compares real wall-clock time against that instant — nobody
needs to be online at midnight for it to flip. `App.jsx`'s `Root` component
picks `CountdownScene` or `OpeningScene` based on that single boolean.

### Creator preview mode

Visit `/?preview=forveer39` once — it's stashed in `sessionStorage` for that
tab only. It unlocks a small panel (bottom-right) to force Countdown or
Birthday mode for testing, without ever touching the real unlock date or
affecting Veer's session. **Before sending the real link, change the
passphrase** in `src/lib/previewMode.js` (`PREVIEW_PASSPHRASE`) to something
only you know — this is obscurity, not real security, and the current value
is in this file.

### Persistent audio

`AudioProvider` creates exactly one `Audio` object on mount and never again.
Every player UI (`PlayPrompt`, `GlobalAudioPlayer`, the full `SongScene`)
reads/writes that same instance via `useAudio()`, so position, volume and
play state survive navigating anywhere in the app.

## Replacing placeholder media

Everything lives in `src/data/media.js`:

1. Drop files into `src/assets/photos`, `src/assets/videos`, `src/assets/audio`.
2. Import them at the top of `media.js`.
3. Point `SONG.src`, each `PHOTOS[i].src`, `VIDEOS.scrapbook.src`,
   `VIDEOS.reveal.src`, and `VOICE_NOTE.src` at the imports.

The song defaults to expecting a file at `public/media-todo/our-song.mp3` —
drop it there for a zero-code-change quick start, or move it into
`src/assets/audio` and update the import as above.

## What's built vs. what's next

**Built now:** design system, routing, unlock logic, cinematic opening,
countdown mode with two working mini-games, creator preview mode, Explore
navigation, persistent global audio (including a working Our Song scene),
placeholder media registry, and a themed placeholder for every remaining act.

**Next phase** (scenes already routed, just need real content): Baby Quiz,
Memory Scrapbook, Veer Wrapped stats, Open When envelopes, 20 Things, Secret
Vault + the seven easter eggs + the 37/39 motif, the virtual gift, the voice
note transition, and the full Romantic Movie Credits + final climax.
