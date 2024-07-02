import './App.css'
import ClickerSection from './sections/ClickerSection'
import LevelSection from './sections/LevelSection'
import UpgradeSection from './sections/UpgradeSection'
import { Analytics } from "@vercel/analytics/react"
import SupportPopup from './popups/SupportPopup'
import HeaderSection from './sections/HeaderSection'
import Backgrounds from './content/backgrounds'
import useGameStore from './lib/store'
import { useEffect } from 'react'
import LoadingScreen from './sections/LoadingScreen'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import ChatPopup from './popups/ChatPopup'

const queryClient = new QueryClient()

export default function App() {
  const toggleCookieMode = useGameStore(state => state.toggleCookieMode)

  useEffect(() => {
    function onKeyPress(event: KeyboardEvent) {
      if (event.key !== "`") return;
      toggleCookieMode()
    }
    window.addEventListener("keypress", onKeyPress)
    return () => window.removeEventListener("keypress", onKeyPress)
  })

  return (
    <QueryClientProvider client={queryClient}>
      <main className='flex flex-col lg:h-screen min-h-screen h-full'>
        <LoadingScreen />

        <HeaderSection />

        <div className='grid lg:grid-cols-3 lg:grid-rows-[1fr_2rem] p-6 min-h-0 gap-6 relative'>
          <div className='flex flex-col lg:col-span-2 min-h-[48rem] gap-6'>
            <ClickerSection />
            <LevelSection />
          </div>
          <UpgradeSection />
          <ChatPopup />
        </div>

        <Analytics />
        <SupportPopup />


        <div className='invisible fixed'>
          {Backgrounds.map(background => <img key={background} src={`/assets/backgrounds/${background}`} />)}
        </div>
      </main>
    </QueryClientProvider>
  )
}
