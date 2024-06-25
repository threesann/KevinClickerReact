import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import Tips from "../content/tips";
import useGameStore from "../lib/store";
import KevinRain from "./effects/KevinRain"

const LOADING_TIME = 500 + (2000 * Math.random())

function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

interface ComponentProps { }
export default function LoadingScreen({ }: ComponentProps) {
  const [selectedTip] = useState(Tips[getRandomInt(0, Tips.length - 1)])
  const [loadingTimeLeft, setLoadingTimeLeft] = useState(LOADING_TIME)
  const [isLoading, setIsLoading] = useState(true)
  const cookieMode = useGameStore(state => state.cookie_mode)

  useEffect(() => {
    let interval = setInterval(() => {
      setLoadingTimeLeft(old => {
        if (old <= 0) {
          setIsLoading(false);
          clearInterval(interval)
        }

        return old - 100
      })
    }, 100)
    return () => clearInterval(interval)
  }, [])

  return <motion.div
    animate={{ scale: isLoading ? 1 : 1.25, opacity: isLoading ? 1 : 0, pointerEvents: isLoading ? "auto" : "none" }}
    className="fixed -inset-32 bg-gradient-to-br from-[#3d63ff] to-blue-500 z-50 p-6 grid place-items-center"
  >
    {isLoading && Array.from(new Array(100)).map((_, i) =>
      <KevinRain key={i} />
    )}

    <div className="text-center m-6">
      <img src={cookieMode ? "/assets/logo_main-cookie.png" : "/assets/logo_main.png"} className="max-w-md" />
      <p className="text-xl text-white/75 max-w-md text-center">{selectedTip}</p>
      <div className="w-full h-10 bg-black/50 border-4 mt-3 overflow-hidden">
        <div style={{ backgroundImage: "url(/assets/clicker/kevster.png)", backgroundSize: "auto 100%", width: `${(1 - (loadingTimeLeft / LOADING_TIME)) * 100}%` }} className="h-full" />
      </div>
      <p>Loading...</p>
    </div>
  </motion.div>
}