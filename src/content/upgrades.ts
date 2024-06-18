import useGameStore from "../lib/store";
import { Upgrade } from "./upgrades.types";

export const upgrades =  [
  {
    id: "poolcue",
    name: "poolcue",
    description: "Prods Kevster to make passive KevBucks!",
    image: "assets/icons/icon_poolcue.png",

    price: (level) => Math.round(50 + (8 * level ** 1.35)),
    kps: (level) => level * 2,
    effects: (level) => {
      useGameStore.getState().setCueCount(level)
    },
  },
  {
    id: "localbank",
    name: "local bank",
    description: "Small local Bank to produce some additional Bucks!",
    image: "assets/icons/icon_localbank.png",

    price: (level) => Math.round(250 + (9 * level ** 1.35)),
    kps: (level) => level * 10,

    parent_upgrade: "poolcue"
  },
  {
    id: "5coursemeal",
    name: "5 course meal",
    description:
      "Keeping Kevster fed is a great way to keep him producing, huh?",
    image: "assets/icons/icon_fivecourse.png",

    price: (level) => Math.round(500 + (10 * level ** 1.35)),
    kps: (level) => level * 20,

    parent_upgrade: "localbank"
  },
  {
    id: "fancycue",
    name: "fancycue",
    description:
      "Prods Kevster with style to produce even more KevBucks!",
    image: "assets/icons/icon_placeholder.png",

    price: (level) => Math.round(1000 + (11 * level ** 1.35)),
    kps: (level) => level * 30,
    effects: (level) => {
      useGameStore.getState().setGoldenCueCount(level)
    },

    parent_upgrade: "5coursemeal"
  },
] as Upgrade[]