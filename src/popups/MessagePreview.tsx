import { useEffect, useState } from "react";
import { Message } from "./ChatPopup";
import { motion, AnimatePresence } from "framer-motion"

interface ComponentProps {
  message: Message
}
export default function MessagePreview({ message }: ComponentProps) {
  const [shown, setShown] = useState(message.recieved_at + 3000 > Date.now())

  useEffect(() => {
    let timeout = setTimeout(() => setShown(message.recieved_at + 3000 > Date.now()), 3000)
    return () => clearTimeout(timeout)
  }, [message])

  return <AnimatePresence>
    {shown &&
      <motion.div layout className="flex flex-col bg-black/50 p-1.5 overflow-hidden mt-1.5" initial={{ opacity: 0 }} animate={{ opacity: shown ? 1 : 0 }} exit={{ opacity: 0 }}>
        <span className={`leading-5`} style={{ color: message.profile.display_colour }}>{message.profile.username}</span>
        <span className="leading-tight text-sm">{message.content}</span>
      </motion.div>
    }
  </AnimatePresence>
}