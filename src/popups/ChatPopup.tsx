import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import useGameStore from "../lib/store";
import supabase from "../lib/supabase";
import { motion } from "framer-motion"
import MessagePreview from "./MessagePreview";

export interface Message {
  content: string;
  profile: {
    username: string;
    admin: boolean;
    display_colour: string;
  },
  recieved_at: number;
}

interface ComponentProps { }
export default function ChatPopup({ }: ComponentProps) {
  const { data } = useQuery({ queryKey: ["user"], queryFn: () => supabase.auth.getUser().then(x => x.data) })
  const { data: profile } = useQuery({ enabled: !!data?.user, queryKey: ["profile"], queryFn: () => supabase.from("profiles").select("*").eq("id", data?.user?.id).limit(1).single().then(x => x.data) })
  const chatShown = useGameStore(store => store.chat_shown)
  const toggleChatShown = useGameStore(store => store.toggleChatShown)
  const [messages, setMessages] = useState<Message[]>([])
  const [content, setContent] = useState("")
  const messageBoxRef = useRef<HTMLDivElement>(null)
  const [showRecentMessage, setShowRecentMessage] = useState(false)

  const [chatPosition, setChatPosition] = useState([null, null])
  const [chatRotation, setChatRotation] = useState("0deg")

  const [announcement, setAnnouncement] = useState("")
  const [jumpscare, setJumpscare] = useState("")
  const [videoJumpscare, setVideoJumpscare] = useState(false)

  useEffect(() => {
    const channel = supabase
      .channel("chat")
      .on("broadcast", { event: "message" }, ({ payload }: any) => {
        setMessages(messages => [...messages, { ...payload, recieved_at: Date.now() }]);
        setTimeout(() => setShowRecentMessage(!showRecentMessage), 3000)


        let isAdmin = !!payload.profile.admin
        if (!isAdmin) return;
        if (!payload.content.startsWith("/")) return;

        let command = payload.content.split(/\s/g)


        if (command[0] === "/refresh") {
          window.location.reload()
        }

        if (command[0] === "/chat") {
          let [_, arg1, arg2] = command

          if (arg1 === "reset") {
            setChatPosition([null, null])
            setChatRotation("0deg")
          }
          else if (arg1.includes("deg")) {
            setChatRotation(arg1)
          }
          else if (arg2) {
            setChatPosition([arg1, arg2])
          }
        }

        if (command[0] === "/announce") {
          let announcement_content = payload.content.replace("/announce ", "")
          setAnnouncement(announcement_content)
          setTimeout(() => setAnnouncement(""), 5_000)
        }

        if (command[0] === "/kevin") {
          setJumpscare(command[1] ?? "/assets/clicker/kevster.png")
          setTimeout(() => setJumpscare(""), command[2] ? parseInt(command[2]) : 500)
        }

        if (command[0] === "/cool") {
          setVideoJumpscare(true)
          setTimeout(() => setVideoJumpscare(false), 1000)
        }

        if (command[0] === "/support") {
          useGameStore.setState({ support_shown: true })
        }

        if (command[0] === "/animate") {
          if (command[1] === "backflip")
            document.querySelector("body")?.animate(
              [
                { transform: "rotate(0)" },
                { transform: "rotate(360deg)" },
              ],
              { duration: 2500, iterations: 1, }
            )

          if (command[1] === "backflip-chat")
            document.querySelector("#chat")?.animate(
              [
                { transform: "rotate(0)" },
                { transform: "rotate(360deg)" },
              ],
              { duration: 2500, iterations: 1, }
            )

          if (command[1] === "shy")
            document.querySelector("body")?.animate(
              [
                { transform: "scale(1)" },
                { transform: "scale(0.25)" },
              ],
              { duration: 10_000, iterations: 1, }
            )
        }
      })
      .subscribe((status) => {
        console.log(status);
      })

    return () => {
      channel.unsubscribe()
    }
  }, [])

  useEffect(() => {
    if (typeof messageBoxRef.current?.scrollTop !== "undefined") messageBoxRef.current.scrollTo({ "top": messageBoxRef.current?.scrollHeight })
  }, [messages])

  function sendMessage() {
    if (content.length === 0) return;
    let message_profile = profile
    if (!message_profile) message_profile = {
      username: "GUEST"
    }

    supabase.channel("chat").send({ type: "broadcast", event: "message", payload: { content, profile: message_profile } })
    setContent("")
  }

  return <div>
    {videoJumpscare && <video src="/assets/foxy.mp4" autoPlay className="fixed z-50 inset-0 h-full w-full" />}

    {jumpscare && <motion.div className="fixed z-50 inset-0"><img src={jumpscare} className="h-full w-full" /></motion.div>}

    {announcement && <div className="fixed inset-0 p-6 z-50 flex items-center justify-center">
      <h2 className="text-7xl bg-black/50 text-center">{announcement}</h2>
    </div>}

    <div id="chat" className="absolute top-16 left-[0rem] flex transition-all duration-[5000ms]" style={{ left: chatPosition[0] ?? "0rem", top: chatPosition[1] ?? "4rem", rotate: chatRotation }}>
      {chatShown &&
        <div className="bg-[#3d63ff] w-64 sm:w-96 border-2 flex flex-col p-1.5 h-64">
          <div ref={messageBoxRef} className="h-full overflow-y-scroll no-scrollbar flex flex-col gap-1 h-72 mb-1.5">
            {messages.map((message, i) =>
              <div key={message.content + i} className="flex flex-col bg-black/10 p-1.5">
                <span className={`leading-5`} style={{ color: message.profile.display_colour }}>{message.profile.username}</span>
                <span className="leading-tight text-sm">{message.content}</span>
              </div>
            )}
          </div>
          <div className="flex gap-1.5">
            <input onKeyPress={ev => {
              if (ev.key === "Enter") sendMessage()
            }} value={content} onChange={(ev) => setContent(ev.target.value)} className="outline-none bg-black/25 px-3 py-1.5 w-full" placeholder="Enter a message..." />
            <button className="h-9 w-9 bg-black/25 hover:bg-black/50 flex-shrink-0" onClick={sendMessage}>
              <span>{">"}</span>
            </button>
          </div>
        </div>
      }

      <div className="relative">
        <button onClick={() => toggleChatShown()} className="px-3 py-0.5 bg-[#3d63ff] border-2 border-b-0 rotate-90 origin-bottom-left h-fit w-fit">
          <span className="text-xl">CHAT</span>
        </button>
        {!chatShown && <div className="absolute min-w-[16rem] top-28 flex flex-col gap-1.5">
          {messages.map((message, i) => <MessagePreview key={message.content + i} message={message} />)}
        </div>}
      </div>
    </div></div>;
}