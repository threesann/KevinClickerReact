import { GameStore } from "../lib/store";

declare global {
  interface Window { cabbage: { more: GameStore["incrementKevBucks"], all: () => void, support: () => void }; }
}

window.cabbage = window.cabbage || {};