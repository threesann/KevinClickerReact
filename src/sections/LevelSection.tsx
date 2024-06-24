import useGameStore from "../lib/store"
import { motion } from "framer-motion"
import { useEffect, useState, useRef } from "react"
import ConfettiExplosion from "react-confetti-explosion"
import { useResizeObserver } from "usehooks-ts"
import Backgrounds from "../content/backgrounds"

interface ComponentProps { }
export default function LevelSection({ }: ComponentProps) {
  const xp = useGameStore(state => state.xp)
  const level = useGameStore(state => state.calculateLevel())
  const current_level_xp = useGameStore(state => state.calculateXP(level))
  const next_level_xp = useGameStore(state => state.calculateXP(level + 1))
  const percentage_complete = (xp - current_level_xp) / (next_level_xp - current_level_xp)

  const [previousLevel, setPreviousLevel] = useState(level)
  const [isCelebrating, setIsCelebrating] = useState(false);

  const ref = useRef<HTMLDivElement>(null)
  const { width = 0 } = useResizeObserver({
    ref,
  })

  useEffect(() => {
    let timeout = -1;

    if (level > previousLevel) {
      setIsCelebrating(true)
      setPreviousLevel(level)
      setTimeout(() => setIsCelebrating(false), 1000)
    }

    let background_index = Math.floor(level / 5) % 3
    let body = document.querySelector("body")
    if (body)
      body.style.backgroundImage = `url("/assets/backgrounds/${Backgrounds[background_index]}")`

    return clearTimeout(timeout)
  }, [level])

  return <div className='w-full'>
    <h2 className="text-6xl">Level {level}</h2>
    <div ref={ref} className="w-full h-10 bg-[#212121] border-4 border-black relative">
      {isCelebrating && <ConfettiExplosion force={0.3} duration={1000} particleCount={200} width={width} className="absolute left-1/2 -translate-x-1/2" />}
      <motion.div className="h-full bg-[#29d45b] border-t-4 border-[#b5e61d]" initial={{ width: 0 }} animate={{ width: `${percentage_complete * 100}%` }} />
      <p className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute text-lg">{xp - current_level_xp}/{next_level_xp} XP</p>
    </div>
  </div>
}