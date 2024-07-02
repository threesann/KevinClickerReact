import { useEffect, useRef, useState } from "react";
import AudioTracks from "../../content/audio";
import useGameStore from "../../lib/store";
import Marquee from "react-fast-marquee";
import VoicelineTracks from "../../content/voicelines";

export default function AudioPlayer() {
  let ref = useRef<HTMLAudioElement>(null)

  const paused = useGameStore(state => state.paused)
  const togglePaused = useGameStore(state => state.togglePaused)

  const songCount = AudioTracks.length
  const [currentlyPlayingIndex, setCurrentlyPlayingIndex] = useState(0)
  const currentlyPlaying = AudioTracks[currentlyPlayingIndex]

  const [shouldLoop, setShouldLoop] = useState(false)

  useEffect(() => {
    let interval: any = setInterval(() => {
      if (paused) return clearInterval(interval)
      if (!ref.current?.paused) clearInterval(interval)
      try {
        ref.current?.play()
      } catch (err) {
        console.log("e")
      }
    }, 500)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (ref.current) {
      if (paused) ref.current.pause()
      else ref.current.play()
    }
  }, [paused, currentlyPlaying])

  return <div className="flex items-center ml-3">
    <button className="hover:bg-black/25 lg:p-2 p-3 w-fit" title="Loop Song" onClick={() => setShouldLoop(!shouldLoop)}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={(`size-6 ${shouldLoop && "animate-spin"}`)}>
        <path fillRule="evenodd" d="M15.312 11.424a5.5 5.5 0 0 1-9.201 2.466l-.312-.311h2.433a.75.75 0 0 0 0-1.5H3.989a.75.75 0 0 0-.75.75v4.242a.75.75 0 0 0 1.5 0v-2.43l.31.31a7 7 0 0 0 11.712-3.138.75.75 0 0 0-1.449-.39Zm1.23-3.723a.75.75 0 0 0 .219-.53V2.929a.75.75 0 0 0-1.5 0V5.36l-.31-.31A7 7 0 0 0 3.239 8.188a.75.75 0 1 0 1.448.389A5.5 5.5 0 0 1 13.89 6.11l.311.31h-2.432a.75.75 0 0 0 0 1.5h4.243a.75.75 0 0 0 .53-.219Z" clipRule="evenodd" />
      </svg>
    </button>
    <button className="hover:bg-black/25 lg:p-2 p-3 w-fit" title="Previous Song" onClick={() => setCurrentlyPlayingIndex(index => index <= 0 ? songCount - 1 : index - 1)}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-6">
        <path d="M7.712 4.818A1.5 1.5 0 0 1 10 6.095v2.972c.104-.13.234-.248.389-.343l6.323-3.906A1.5 1.5 0 0 1 19 6.095v7.81a1.5 1.5 0 0 1-2.288 1.276l-6.323-3.905a1.505 1.505 0 0 1-.389-.344v2.973a1.5 1.5 0 0 1-2.288 1.276l-6.323-3.905a1.5 1.5 0 0 1 0-2.552l6.323-3.906Z" />
      </svg>
    </button>
    <div className="text-lg lg:text-sm text-center mx-4 lg:mx-2 w-32">
      <Marquee className="leading-4"><span className="leading-4 mx-4">{currentlyPlaying.name}</span></Marquee>
      <span className="leading-4 mx-4 text-white/50">{currentlyPlaying.artist}</span>
    </div>
    <button className="hover:bg-black/25 lg:p-2 p-3 w-fit" title="Next Song" onClick={() => setCurrentlyPlayingIndex(index => index >= songCount - 1 ? 0 : index + 1)}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-6">
        <path d="M3.288 4.818A1.5 1.5 0 0 0 1 6.095v7.81a1.5 1.5 0 0 0 2.288 1.276l6.323-3.905c.155-.096.285-.213.389-.344v2.973a1.5 1.5 0 0 0 2.288 1.276l6.323-3.905a1.5 1.5 0 0 0 0-2.552l-6.323-3.906A1.5 1.5 0 0 0 10 6.095v2.972a1.506 1.506 0 0 0-.389-.343L3.288 4.818Z" />
      </svg>
    </button>
    <button className="hover:bg-black/25 lg:p-2 p-3 w-fit" title="Pause/Play" onClick={() => {
      togglePaused()

      if (paused) {
        let voicelines = VoicelineTracks.filter(x => x.tags.includes("music.start"))
        let random = Math.floor(Math.random() * voicelines.length);
        new Audio(voicelines[random].file).play()
      }
    }}>
      {!paused ?
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-6">
          <path d="M5.75 3a.75.75 0 0 0-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 0 0 .75-.75V3.75A.75.75 0 0 0 7.25 3h-1.5ZM12.75 3a.75.75 0 0 0-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 0 0 .75-.75V3.75a.75.75 0 0 0-.75-.75h-1.5Z" />
        </svg>
        : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-6">
          <path d="M6.3 2.84A1.5 1.5 0 0 0 4 4.11v11.78a1.5 1.5 0 0 0 2.3 1.27l9.344-5.891a1.5 1.5 0 0 0 0-2.538L6.3 2.841Z" />
        </svg>
      }
    </button>
    <div className="hidden">
      <audio
        ref={ref}
        src={currentlyPlaying.file}
        loop={shouldLoop}
        onEnded={() => {
          if (shouldLoop) return;
          setCurrentlyPlayingIndex(index => index >= songCount - 1 ? 0 : index + 1)
        }}
      />
    </div>
  </div>
}
