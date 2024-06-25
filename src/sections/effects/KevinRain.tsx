import { useEffect, useState } from "react"

interface ComponentProps { }
export default function KevinRain({ }: ComponentProps) {
  const [positionX, setPositionX] = useState(window.innerWidth * Math.random())
  const [delay, setDelay] = useState(Math.random() * 3)

  useEffect(() => {
    let interval = -1
    let timeout = setTimeout(() => {
      interval = setInterval(() => {
        setPositionX(() => (window.innerWidth * Math.random()))
      }, 2000)
    }, delay * 1000)

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }

  }, [])


  return <img
    src="/assets/clicker/kevster.png"
    className="h-10 fixed opacity-50 animate-[rain_2s_infinite_linear] -translate-y-[100vh]"
    style={{
      left: positionX,
      animationDelay: delay + "s"
    }} />
}