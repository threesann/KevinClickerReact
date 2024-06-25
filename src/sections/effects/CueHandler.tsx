import { useState } from "react"
import { useInterval } from 'usehooks-ts'
import { motion } from "framer-motion"
import useGameStore from "../../lib/store"

interface ComponentProps { }
export default function CueHandler({ }: ComponentProps) {
  const [tick, setTick] = useState(0)
  const cue_amount = useGameStore(state => state.cue_count)

  useInterval(() => setTick(tick + 1), 50)

  var cue_array_temp = Array.from(new Array(cue_amount))
  var cue_layers = []
  while (cue_array_temp.length > 0)
    cue_layers.push(cue_array_temp.splice(0, 50));
  cue_layers = cue_layers.splice(0, 8)

  return <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 -z-10" style={{ rotate: `${tick % 360}deg` }}>
    {cue_layers.map((layer, l) => layer.map((_, i, a) => {
      let current_index = i + l * 50

      return <div key={current_index} className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
        <motion.div animate={{ rotate: `${360 / a.length * i + l * 4.75}deg` }}>
          <motion.div transition={{ duration: 0.25 }} className="relative w-32" animate={{ translate: `${(8 + l * 4) - ((tick / Math.max(3, 16 - cue_amount)) % cue_amount === current_index ? 4 : 0)}rem` }}>
            <img src="/assets/clicker/cue.png" className="w-[400px] h-[170px] scale-75 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[182deg]" />
          </motion.div>
        </motion.div>
      </div>
    }
    ))}
  </div>
}