import './App.css'
import Audio from './sections/Audio'
import ClickerSection from './sections/ClickerSection'
import FooterSection from './sections/FooterSection'
import LevelSection from './sections/LevelSection'
import UpgradeSection from './sections/UpgradeSection'

export default function App() {
  return (
    <main className='grid lg:grid-cols-3 lg:grid-rows-[1fr_2rem] lg:h-screen min-h-screen h-full p-6 gap-6'>
      <div className='flex flex-col lg:col-span-2 min-h-[48rem] gap-6'>
        <ClickerSection />
        <LevelSection />
      </div>
      <UpgradeSection />
      <FooterSection />
      <Audio />
    </main>
  )
}