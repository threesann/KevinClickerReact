import CueHandler from "./effects/CueHandler";
import { motion } from "framer-motion"
import useGameStore from "../lib/store";
import { useEffect, useMemo, useState } from "react";
import { upgrades } from "../content/upgrades";
import VoicelineTracks from "../content/voicelines";

interface ComponentProps { }
export default function ClickerSection({ }: ComponentProps) {
  const kevBucks = useGameStore(state => state.kev_bucks)
  const incrementKevBucks = useGameStore(state => state.incrementKevBucks)

  const cookieMode = useGameStore(state => state.cookie_mode)

  const [kevPerSec, setKevPerSec] = useState(0);
  const [playerClicks, setPlayerClicks] = useState(0)
  const [_, setPrevKevBucks] = useState(kevBucks)

  const kevBucksDisplay = useMemo(() => {
    if (kevBucks >= 1_000_000) {
      return Intl.NumberFormat("en-GB", { notation: "compact", maximumFractionDigits: 1 }).format(kevBucks)
    }
    return kevBucks
  }, [kevBucks])


  useEffect(() => {
    let interval = setInterval(() => setPrevKevBucks(prev => {
      let current_bucks = useGameStore.getState().kev_bucks
      let difference = current_bucks - prev;
      setKevPerSec(difference)
      setPlayerClicks(0)
      return current_bucks
    }), 1000)

    window.parsnip = {
      more: incrementKevBucks,
      all: (level: number = 10) => {
        useGameStore.setState({ purchased_upgrades: Object.fromEntries(upgrades.map(u => [u.id, level])) })
      },
      support: () => {
        useGameStore.setState({ support_shown: true })
      }
    }

    return () => clearInterval(interval)
  }, [])

  function onClick() {
    setPlayerClicks(v => v + 1)

    let chance = Math.random() < (1 / 20)
    if (chance) {
      let voicelines = VoicelineTracks.filter(x => x.tags.includes("click"))
      let random = Math.floor(Math.random() * voicelines.length);
      new Audio(voicelines[random].file).play()
    }

    if (playerClicks < 20) return incrementKevBucks()
  }

  return <div className='w-full h-full flex flex-col gap-3 justify-center items-center overflow-hidden'>
    <div className="flex items-center justify-center relative">
      <motion.button onMouseDown={onClick} className="disable-dbl-tap-zoom min-h-48 min-w-48 w-1/4 aspect-square max-w-64 max-h-64 bg-black/50 rounded-full relative group">
        <motion.div animate={{ inset: "0.1rem", translateY: "-0.65rem" }} transition={{ duration: 0.05 }} whileTap={{ inset: 0, translateY: 0 }} className="absolute outline-none border-2 border-white/50 bg-white rounded-full" style={{
          backgroundImage: cookieMode ? `url(/assets/clicker/cookie.png)` : `url(/assets/clicker/kevster_heaven.png)`,
          backgroundSize: "cover",
          backgroundPosition: "center"
        }} />
      </motion.button>
      <CueHandler />
    </div>

    <div className="flex flex-col gap-3 items-center">
      <div className="flex gap-2">
        <img src="/assets/kevbuck.gif" className="h-10 w-10 translate-y-1.5" />
        <h2 className="text-6xl leading-[3rem] font-bold tracking-[-0.2rem]" style={{ filter: "drop-shadow(0 4px 4px rgb(0 0 0 / 0.5))" }}>{kevBucksDisplay}</h2>
        <p className="text-2xl leading-[2rem]">{cookieMode ? "Kookie" : "Kev"}Bucks</p>
      </div>
      <p className="leading-snug text-xl">{kevPerSec} {cookieMode ? "Kookie" : "Kev"}Bucks/s</p>
    </div>
  </div>
}