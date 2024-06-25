import { GameStore } from "../lib/store";

declare global {
  interface Window { parsnip: { more: GameStore["incrementKevBucks"], all: () => void, support: () => void }; }
}

window.parsnip = window.parsnip || {};