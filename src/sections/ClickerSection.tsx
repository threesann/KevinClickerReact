import CueHandler from "./effects/CueHandler";
import { motion } from "framer-motion"
import useGameStore from "../lib/store";
import { useEffect, useMemo, useState } from "react";

interface ComponentProps { }
export default function ClickerSection({ }: ComponentProps) {
  const kevBucks = useGameStore(state => state.kev_bucks)
  const incrementKevBucks = useGameStore(state => state.incrementKevBucks)

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
    return () => clearInterval(interval)
  }, [])

  function onClick() {
    setPlayerClicks(v => v + 1)
    if (playerClicks < 20) return incrementKevBucks()
  }

  return <div className='w-full h-full flex flex-col gap-3 justify-center items-center overflow-hidden'>
    <div className="flex items-center justify-center relative">
      <motion.button onClick={onClick} className="disable-dbl-tap-zoom min-h-48 min-w-48 w-1/4 aspect-square max-w-64 max-h-64 bg-black/50 rounded-full relative group">
        <motion.div animate={{ inset: "0.1rem", translateY: "-0.65rem" }} transition={{ duration: 0.05 }} whileTap={{ inset: 0, translateY: 0 }} className="absolute outline-none border-2 border-white/50 bg-white rounded-full" style={{
          backgroundImage: `url(/assets/clicker/kevster_heaven.png)`,
          backgroundSize: "cover",
          backgroundPosition: "center"
        }} />
      </motion.button>
      <CueHandler />
    </div>

    <div className="flex flex-col gap-3 items-center">
      <div className="flex gap-2">
        <img src="/assets/kevbuck.gif" className="h-10 w-10 translate-y-1.5" />
        <h2 className="text-6xl leading-[3rem] font-bold tracking-[-0.2rem]" style={{filter: "drop-shadow(0 4px 4px rgb(0 0 0 / 0.5))"}}>{kevBucksDisplay}</h2>
        <p className="text-2xl leading-[2rem]">KevBucks</p>
      </div>
      <p className="leading-snug text-xl">{kevPerSec} KevBucks/s</p>
    </div>
  </div>
}