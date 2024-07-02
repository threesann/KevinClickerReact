import throttle from "lodash.throttle";
import { useEffect, useState } from "react";
import VoicelineTracks from "../../content/voicelines";
import supabase from "../../lib/supabase";
import Popup from "../../popups/Popup";

interface ComponentProps { }
export default function LeaderboardButton({ }: ComponentProps) {
  const [leaderboard, setLeaderboard] = useState<{ username: string, xp: number }[]>([])

  useEffect(() => {
    const requestLeaderboard = throttle(async () => {
      const { data, error } = await supabase.rpc("get_leaderboard")
      if (!data || error) return console.error(error);
      setLeaderboard(data)
    }, 15_000)
    requestLeaderboard()

    const channel = supabase.channel("leaderboard").on("postgres_changes" as any, { event: "*", table: "saves" } as any, requestLeaderboard).subscribe()
    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  return <Popup
    trigger={
      <button onMouseDown={() => {
        let voicelines = VoicelineTracks.filter(x => x.tags.includes("leaderboard"))
        let random = Math.floor(Math.random() * voicelines.length);
        new Audio(voicelines[random].file).play()
      }} className="bg-black/25 hover:bg-black/50 p-1 w-fit flex-shrink-0" title="Leaderboard">
        <img src="/assets/header/m_button_leader.png" className="size-10" />
      </button>
    }
    title="Leaderboard"
  >
    {leaderboard.map((entry, i) =>
      <div key={entry.username} className="odd:bg-black/10 event:bg-white/10 px-3 py-2 flex items-center gap-3 justify-between">
        <div className="flex items-center gap-3">
          <span className="font-bold text-xl">{i + 1}</span>
          <span className="text-lg">{entry.username}</span>
        </div>
        <span className="text-lg">{entry.xp} XP</span>
      </div>
    )}
  </Popup>
}