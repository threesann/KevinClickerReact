import { GameStore } from "../lib/store";

declare global {
  interface Window { __dev__add__kev__bucks__: GameStore["incrementKevBucks"]; }
}

window.__dev__add__kev__bucks__ = window.__dev__add__kev__bucks__ || {};