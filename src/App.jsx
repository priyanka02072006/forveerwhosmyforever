import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { ExperienceProvider, useExperience } from './context/ExperienceContext'
import { AudioProvider } from './context/AudioContext'
import ExploreMenu from './components/layout/ExploreMenu'
import PreviewPanel from './components/layout/PreviewPanel'

import CountdownScene from './scenes/CountdownScene'
import OpeningScene from './scenes/OpeningScene'
import ArcadeScene from './scenes/ArcadeScene'
import SongScene from './scenes/SongScene'
import PlaceholderScene from './scenes/PlaceholderScene'
import BabyQuizScene from './scenes/BabyQuizScene'
import MemoriesScene from './scenes/MemoriesScene'
import WrappedScene from './scenes/WrappedScene'
import OpenWhenScene from './scenes/OpenWhenScene'
import TwentyThingsScene from './scenes/TwentyThingsScene'
import VaultScene from './scenes/VaultScene'
import CreditsScene from './scenes/CreditsScene'
import FinaleScene from './scenes/FinaleScene'
import LockedRoute from './components/layout/LockedRoute'

function Root() {
  const { unlocked } = useExperience()
  return unlocked ? <OpeningScene /> : <CountdownScene />
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Root />} />
      <Route path="/arcade" element={<ArcadeScene />} />
      <Route path="/song" element={<LockedRoute><SongScene /></LockedRoute>} />

      <Route path="/quiz" element={<LockedRoute><BabyQuizScene /></LockedRoute>} />
      <Route path="/memories" element={<LockedRoute><MemoriesScene /></LockedRoute>} />
      <Route path="/wrapped" element={<LockedRoute><WrappedScene /></LockedRoute>} />
      <Route path="/open-when" element={<LockedRoute><OpenWhenScene /></LockedRoute>} />
      <Route path="/20-things" element={<LockedRoute><TwentyThingsScene /></LockedRoute>} />
      <Route path="/vault" element={<LockedRoute><VaultScene /></LockedRoute>} />
      <Route path="/credits" element={<LockedRoute><CreditsScene /></LockedRoute>} />
      <Route path="/finale" element={<LockedRoute><FinaleScene /></LockedRoute>} />
      <Route
        path="*"
        element={
          <PlaceholderScene
            theme="finale"
            eyebrow="scene not found"
            title="Wrong door."
            note="There's nothing back here — try the menu."
          />
        }
      />
    </Routes>
  )
}

export default function App() {
  return (
    <ExperienceProvider>
      <AudioProvider>
        <AppRoutes />
        <ExploreMenu />
        <PreviewPanel />
      </AudioProvider>
    </ExperienceProvider>
  )
}
