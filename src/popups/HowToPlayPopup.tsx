import Popup from "./Popup";

interface ComponentProps { }
export default function HowToPlayerPopup({ }: ComponentProps) {
  return <Popup trigger={
    <button className="bg-black/25 hover:bg-black/50 p-1 w-fit flex-shrink-0" title="How to Play">
      <img src="/assets/header/button_help.gif" className="h-10 w-10" />
    </button>
  }
    title="How to play!">
    <p>If you need any support/need to report a bug, please email <u><a href="mailto:snookerinc51@gmail.com">snookerinc51@gmail.com</a></u>.</p>
    <br />
    <p><u>Gameplay</u></p>
    <p>Click on Kevster's beautiful face to amass KevBucks. Using your KevBucks, buy upgrades to automate production.</p>
    <br />
    <p><u>Navbar</u></p>
    <p>The Navbar has 4 buttons on the right hand side:</p>
    <li>BACK TO HOME<br />‎ ‎ ‎  Returns to threesann.github.io.</li>
    <li>HELP<br />‎ ‎ ‎  Good job, you opened this one.</li>
    <li>CREDITS<br />‎ ‎ ‎  Names the poor souls who made this game.</li>
    <li>RESET PROGRESS<br />‎ ‎ ‎  Resets all of your progress.</li>
    <br />
    <p>Don't worry! The reset button is protected behind one (1) alert confirmation. Have fun!</p>
    <br />
    <p><u>Accounts</u></p>
    <p>On the left hand side of the Navbar, users who aren't logged in will see the option to Log In. Here, users can register a new account/password or log into an existing account. Once logged in, all gameplay will be saved online, ready to be accessed from any device!</p>
    <br />
    <p>More features will be added, so this screen will be updated too. Love you! {"<3"} xoxo</p>
  </Popup>
}