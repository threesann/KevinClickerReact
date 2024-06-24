import AudioPlayer from "./header/AudioPlayer";
import ResetButton from "./header/ResetButton";

export default function HeaderSection() {
  return <header className="bg-[#3d63ff] border-b-4 border-[#355af0] w-full h-fit">
    <div className="flex justify-between items-center relative flex-col sm:flex-row gap-3 px-3 lg:px-0 lg:gap-0 py-3 sm:py-0">

      {/* left */}
      <div className="flex gap-1 items-center">
        <AudioPlayer />
      </div>

      {/* center */}
      <div className="absolute left-1/2 -translate-x-1/2 hidden lg:block">
        <h1 className="text-3xl drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">KEVSTER CLICKER</h1> {/* placeholder */}
      </div>

      {/* right */}
      <div className="flex gap-1">
        <a href="https://threesann.github.io" title="Back to Home">
          <div className="bg-black/25 hover:bg-black/50 p-2 lg:p-2 w-fit">
            <img src="/public/assets/header/button_home.png" className="h-8 w-8" />
          </div>
        </a>
        <button className="bg-black/25 hover:bg-black/50 p-2 lg:p-2 w-fit" title="Help" onClick={() => {
          alert(["waiting for david lazy ass to add popup windows before i write this shit"])
        }}>
          <img src="/public/assets/header/button_help.gif" className="h-8 w-8" />
        </button>
        <button className="bg-black/25 hover:bg-black/50 p-2 lg:p-2 w-fit" title="Credits" onClick={() => {
          alert([
            "Programming: David Fiddes",
            "Assets & Music: Rishabh Sandhu",
            "Concepts/Additional Help: Leon Carpin",
            "",
            "Playtesters: Daniels, Josh, Harry",
            "Big Shoutouts: God Emperor Kevster II",
            "Thanks for playing!",
          ].join("\n"),)
        }}>
          <img src="/public/assets/header/button_credits.png" className="h-8 w-8" />
        </button>
        <ResetButton />
      </div>

    </div>
  </header>
}
