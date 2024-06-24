import useGameStore from "../lib/store"

interface ComponentProps { }
export default function FooterSection({ }: ComponentProps) {
  
  return <div className='lg:col-span-3 flex items-center justify-center sm:divide-x-2 my-3 flex-col sm:flex-row leading-tight'>
    <button className="px-3" onClick={() => {
      alert([
        "Programming: David Fiddes",
        "Assets & Music: Rishabh Sandhu",
        "Concepts/Additional Help: Leon Carpin",
        "",
        "Playtesters: Daniels, Josh, Harry",
        "Big Shoutouts: God Emperor Kevster II",
        "Thanks for playing!",
      ].join("\n"),)
    }}>Made by Snooker Inc</button>
    <button className="px-3" onClick={() => {
      let confirmation = confirm("Are you sure you want to reset your progress?")
      if (confirmation)
        useGameStore.setState(useGameStore.getInitialState())
    }}>Reset Progress</button>
  </div>
}