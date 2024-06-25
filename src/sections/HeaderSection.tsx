import useGameStore from "../lib/store";
import CreditsPopup from "../popups/CreditsPopup";
import HowToPlayerPopup from "../popups/HowToPlayPopup";
import AudioPlayer from "./header/AudioPlayer";
import ResetButton from "./header/ResetButton";

export default function HeaderSection() {
  const cookieMode = useGameStore(state => state.cookie_mode)

  return <header className="bg-[#3d63ff] border-b-4 border-[#355af0] w-full h-fit">
    <div className="flex justify-between items-center relative flex-col sm:flex-row gap-3 px-3 lg:px-0 lg:gap-0 py-3 sm:py-0">

      {/* left */}
      <div className="flex gap-1 items-center">
        <AudioPlayer />
      </div>

      {/* center */}
      <div className="absolute left-1/2 -translate-x-1/2 hidden lg:block">
        <img src={cookieMode ? "/assets/logo_main-cookie.png" : "/assets/logo_main.png"} className="h-10" />
        {/* <h1 className="text-3xl drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] uppercase">{cookieMode ? "Kookie" : "Kevster"} Clicker</h1> {/* placeholder */}
      </div>

      {/* right */}
      <div className="flex gap-1">
        <a href="https://threesann.github.io" title="Back to Home">
          <div className="bg-black/25 hover:bg-black/50 p-1 w-fit">
            <img src="/assets/header/button_home.png" className="h-10 w-10" />
          </div>
        </a>
        <HowToPlayerPopup />
        <CreditsPopup />
        <ResetButton />
      </div>

    </div>
  </header>
}
