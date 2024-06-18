import { useEffect, useRef } from "react";
import ReactAudioPlayer from "react-audio-player";
import useGameStore from "../lib/store";

export default function Audio() {
  const muted = useGameStore(state => state.muted)
  let ref = useRef<ReactAudioPlayer>(null)

  useEffect(() => {
    let timeout = setInterval(() => {
      if (!ref.current?.audioEl.current?.paused) clearInterval(timeout)
      try {
        // ref.current?.audioEl.current?.play()
      } catch (err) {
        console.log("e")
      }
    }, 500)
    return () => clearTimeout(timeout)
  }, [])

  return <div className="hidden">
    <ReactAudioPlayer 
      src="/assets/audio/backing.mp3" 
      ref={ref} 

      muted={muted}
      autoPlay 
      loop />
  </div>
}

