import Popup from "./Popup";

interface ComponentProps { }
export default function HowToPlayerPopup({ }: ComponentProps) {
  return <Popup trigger={
    <button className="bg-black/25 hover:bg-black/50 p-1 w-fit" title="Help">
      <img src="/assets/header/button_help.gif" className="h-10 w-10" />
    </button>
  }
    title="How to play!">
    <p>Click on Kevster's beautiful face to amass KevBucks. Using your KevBucks, buy upgrades to automate production. More features will be added, so this screen will be updated too. Love you! {"<3"} xoxo</p>
  </Popup>
}