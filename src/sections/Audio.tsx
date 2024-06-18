import { useEffect, useRef } from "react";
import useGameStore from "../lib/store";

export default function Audio() {
  const muted = useGameStore(state => state.muted)
  let ref = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    let timeout = setInterval(() => {
      if (!ref.current?.paused) clearInterval(timeout)
      try {
        ref.current?.play()
      } catch (err) {
        console.log("e")
      }
    }, 500)
    return () => clearTimeout(timeout)
  }, [])

  return <div className="hidden">
    <audio 
      src="/assets/audio/backing.mp3" 
      ref={ref} 

      muted={muted}
      autoPlay 
      loop />
  </div>
}

