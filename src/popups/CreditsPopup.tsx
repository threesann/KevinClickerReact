import Popup from "./Popup";

interface ComponentProps { }
export default function CreditsPopup({ }: ComponentProps) {
  return <Popup trigger={
    <button className="bg-black/25 hover:bg-black/50 p-1 w-fit" title="Credits">
      <img src="/assets/header/button_credits.png" className="h-10 w-10" />
    </button>
  }  title="Credits!">
    <p>Programming: David Fiddes</p>
    <p>Assets & Music: Rishabh Sandhu</p>
    <p>Concepts/Additional Help: Leon Carpin</p>
    <p>Additional Assets: Josh Taylor</p>
    <p>Playtesters: Daniels, Josh, Harry</p>
    <p>Big Shoutouts: God Emperor Kevster II</p>
    <p>Thanks for playing!</p>

    <img src="/assets/clicker/kevster.png" className="h-32 w-full" />
  </Popup>
}