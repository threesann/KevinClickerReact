import useGameStore from "../lib/store";
import { Upgrade } from "./content.types";


// note: upgrades fancycue and onwards are yet to be properly balanced/tested

export const upgrades = [
  {
    id: "poolcue",
    name: "poolcue",
    description: "Prods Kevster to make passive KevBucks!",
    image: "assets/icons/icon_poolcue.png",

    price: (level) => Math.round(50 + ((6 * level) ** 1.35)), // 50 is the base cost, 6 is the flexible per-upgrade modifier, and 1.35 is the constant exponent across all upgrades.
    kps: (level) => Math.round(1 * level ** 1.5), // 1 is the flexible per-upgrade modifier, 1.5 is a constant exponential modifier across all upgrades. can be changed
    effects: (level) => {
      useGameStore.getState().setCueCount(level)
    },
  },
  {
    id: "localbank",
    name: "local bank",
    description: "Small local Bank to produce some additional Bucks!",
    image: "assets/icons/icon_localbank.png",

    price: (level) => Math.round(1000 + ((25 * level) ** 1.35)),
    kps: (level) => Math.round((4 * level) ** 1.5), 

    parent_upgrade: "poolcue"
  },
  {
    id: "5coursemeal",
    name: "5 course meal",
    description:
      "Keeping Kevster fed is a great way to keep him producing, huh?",
    image: "assets/icons/icon_fivecourse.png",

    price: (level) => Math.round(6000 + ((100 * level) ** 1.35)),
    kps: (level) => Math.round((8 * level) ** 1.5),

    parent_upgrade: "localbank"
  },
  {
    id: "fancycue",
    name: "fancycue",
    description:
      "Prods Kevster with style to produce even more KevBucks!",
    image: "assets/icons/icon_fancycue.png",

    price: (level) => Math.round(20000 + ((200 * level) ** 1.35)),
    kps: (level) => Math.round((15 * level) ** 1.5),
    effects: (level) => {
      useGameStore.getState().setGoldenCueCount(level)
    },

    parent_upgrade: "5coursemeal"
  },
  {
    id: "natbank",
    name: "national bank",
    description:
      "Mints KevBucks at a national scale!",
    image: "assets/icons/icon_natbank.png",

    price: (level) => Math.round(60000 + ((300 * level) ** 1.35)),
    kps: (level) => Math.round((30 * level) ** 1.5),

    parent_upgrade: "fancycue"
  },
  {
    id: "farm",
    name: "kevster's farm",
    description:
      "Grow KevBucks out of the Earth itself!",
    image: "assets/icons/icon_farm.png",

    price: (level) => Math.round(100000 + ((400 * level) ** 1.35)),
    kps: (level) => Math.round((40 * level) ** 1.5),

    parent_upgrade: "natbank"
  },
  {
    id: "bbfactory",
    name: "blackberry factory",
    description:
      "Mass produce the greatest phone of All Time to rake in the KevBucks!",
    image: "assets/icons/icon_bbfactory.png",

    price: (level) => Math.round(200000 + ((500 * level) ** 1.35)),
    kps: (level) => Math.round((50 * level) ** 1.5),

    parent_upgrade: "farm"
  },
  {
    id: "goldencue",
    name: "goldencue",
    description:
      "The finest cue you've ever seen. Engraved with an ornate K. Perfect for prodding.",
    image: "assets/icons/icon_goldencue.png",

    price: (level) => Math.round(310000 + ((600 * level) ** 1.35)),
    kps: (level) => Math.round((60 * level) ** 1.5),

    parent_upgrade: "bbfactory"
  },
  {
    id: "centralbank",
    name: "central bank",
    description:
      "Kevster is now on the Stock Exchange! Mint KevBucks at an international scale!",
    image: "assets/icons/icon_centralbank.png",

    price: (level) => Math.round(400000 + ((1000 * level) ** 1.35)),
    kps: (level) => Math.round((100 * level) ** 1.5),

    parent_upgrade: "goldencue"
  },
  {
    id: "kevx",
    name: "kev-x launchpad",
    description:
      "Send rockets to space to extract KevBucks from other planets!",
    image: "assets/icons/icon_kevx.png",

    price: (level) => Math.round(600000 + ((1300 * level) ** 1.35)),
    kps: (level) => Math.round((120 * level) ** 1.5),

    parent_upgrade: "centralbank"
  },
  {
    id: "chemlab",
    name: "chemical lab",
    description:
      "Break into facilities and steal their chemicals to make KevBucks EVEN STRONGER!!",
    image: "assets/icons/icon_chemlab.png",

    price: (level) => Math.round(800000 + ((1500 * level) ** 1.35)),
    kps: (level) => Math.round((180 * level) ** 1.5),

    parent_upgrade: "kevx"
  },
  {
    id: "matterconv",
    name: "matter converter",
    description:
      "Convert the fabric of the Universe into KevBucks.",
    image: "assets/icons/icon_matterconv.png",

    price: (level) => Math.round(1000000 + ((2000 * level) ** 1.35)),
    kps: (level) => Math.round((200 * level) ** 1.5),

    parent_upgrade: "chemlab"
  },
  {
    id: "timewarp",
    name: "time warper",
    description:
      "Warp in KevBucks from our own future production line! How meta!",
    image: "assets/icons/icon_timewarp.png",

    price: (level) => Math.round(1500000 + ((2500 * level) ** 1.35)),
    kps: (level) => Math.round((350 * level) ** 1.5),

    parent_upgrade: "matterconv"
  },
  {
    id: "metaverse",
    name: "metaverse",
    description:
      "Anything we find can be turned into KevBucks.",
    image: "assets/icons/icon_placeholder.png",

    price: (level) => Math.round(20000000 + ((2800 * level) ** 1.35)),
    kps: (level) => Math.round((600 * level) ** 1.5),

    parent_upgrade: "timewarp"
  },
  {
    id: "quantumwarp",
    name: "quantum warper",
    description:
      "Take advantage of space-time quantum warps to obtain millions of years worth of production!",
    image: "assets/icons/icon_placeholder.png",

    price: (level) => Math.round(30000000 + ((4000 * level) ** 1.35)),
    kps: (level) => Math.round((700 * level) ** 1.5),

    parent_upgrade: "metaverse"
  },
  {
    id: "kevcloner",
    name: "kevcloner",
    description:
      "We can create another. Stronger. Faster. Better. Clone the Man Himself to exponentially accelerate production.",
    image: "assets/icons/icon_kevcloner.png",

    price: (level) => Math.round(50000000 + ((5000 * level) ** 1.35)),
    kps: (level) => Math.round((800 * level) ** 1.5),

    parent_upgrade: "quantumwarp"
  },
  {
    id: "infiniverse",
    name: "The Infiniverse",
    description:
      "You have discovered Infinity. It waits for you.",
    image: "assets/icons/icon_infiniverse.png",

    price: (level) => Math.round(9999999999999 + ((300 * level) ** 1.35)),
    kps: (level) => Math.round((9000 * level) ** 1.5),

    parent_upgrade: "kevcloner"
  },
] as Upgrade[]