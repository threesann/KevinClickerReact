import { motion } from "framer-motion"
import { useEffect, useState } from "react"

const popupChance = 0.1
export default function SupportPopup() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    let timeout = setInterval(() => {
      if (Math.random() < popupChance) {
        setOpen(true)
      }
    }, 1000 * 60)
    return () => clearInterval(timeout)
  }, [])

  return <motion.div className="fixed bottom-3 right-3 px-3 py-1.5 bg-blue-700/90 flex flex-col sm:flex-row gap-3 items-center" initial={{ right: "-25rem" }} animate={{ right: open ? "1rem" : "-25rem" }} transition={{ duration: 7.5 }}>
    <div className="relative w-32 h-24">
      <img src="/assets/support/devansh.png" className="absolute bottom-0" />
    </div>
    <div className="max-w-[14rem]">
      <div className="flex justify-between gap-3 items-center">
        <h3 className="text-xl leading-tight">Need some help?</h3>
        <button onClick={() => setOpen(false)}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
            <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
          </svg>
        </button>
      </div>
      <p className="leading-tight text-white/75">Contact us at <a href="mailto:snookerinc51@gmail.com&subject=Wah wah wah&body=I can't play clicker games without support. Pls help"><u>snookerinc51@gmail.com</u> </a> for support!</p>
    </div>
  </motion.div>
}