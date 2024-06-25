import { useState } from "react"
import useGameStore from "../../lib/store"


export default function ResetButton() {
  const [isHover, setIsHover] = useState(false)
  
  return <button onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)} className="bg-black/25 hover:bg-black/50 p-1 w-fit" title="RESET PROGRESS" onClick={() => {
    let confirmation = confirm("Are you sure you want to reset your progress?")
    if (confirmation)
      useGameStore.setState(useGameStore.getInitialState())
  }}>
    <img src={isHover ? "/public/assets/header/button_reset-hover.gif" :"/assets/header/button_reset.png"} className="h-10 w-10" />
  </button>
}