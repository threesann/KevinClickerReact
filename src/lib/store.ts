import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware'
import { upgrades } from "../content/upgrades";

export interface GameStore {
  kev_bucks: number
  incrementKevBucks: (amount?: number) => void
  deductKevBucks: (amount?: number) => void

  xp: number;
  incrementXP: (amount?: number) => void
  calculateLevel: (xp?: number) => number
  calculateXP: (level?: number) => number

  cue_count: number
  setCueCount: (amount: number) => void

  golden_cue_count: number
  setGoldenCueCount: (amount: number) => void;

  purchased_upgrades: { [id: string]: number }
  incrementUpgradeLevel: (id: string) => void
  calculateKevBucksPerSecond: () => number

  paused: boolean
  togglePaused: (state?: boolean) => void
}

const level_constant = 0.07;
const useGameStore = create(
  persist<GameStore>(
    (set, get) => ({
      kev_bucks: 0,
      incrementKevBucks: (amount: number = 1) => set(state => ({ kev_bucks: state.kev_bucks + amount })),
      deductKevBucks: (amount: number = 1) => set(state => ({ kev_bucks: state.kev_bucks - amount })),

      xp: 0,
      incrementXP: (amount: number = 1) => set(state => ({ xp: state.xp + amount })),
      calculateLevel: (xp: number = get().xp) => Math.floor(Math.sqrt(xp) * level_constant),
      calculateXP: (level: number = get().calculateLevel()) => Math.round((level / level_constant) ** 2),

      cue_count: 0,
      setCueCount: (cue_count) => set({ cue_count }),

      golden_cue_count: 0,
      setGoldenCueCount: (golden_cue_count) => set({ golden_cue_count }),

      purchased_upgrades: {},
      incrementUpgradeLevel: (id: string) => {
        let purchased_upgrades = get().purchased_upgrades
        let previous_level = purchased_upgrades[id] ?? 0
        let new_level = previous_level + 1
        set({ purchased_upgrades: { ...purchased_upgrades, [id]: new_level } })
      },
      calculateKevBucksPerSecond: () => {
        let purchased_upgrades = get().purchased_upgrades

        let kps = 0
        for (let [id, level] of Object.entries(purchased_upgrades)) {
          let upgrade = upgrades.find(upgr => upgr.id === id)
          if (!upgrade) continue;
          let level_kps = upgrade.kps(level)
          kps += level_kps
        }

        return kps
      },

      paused: false,
      togglePaused: (state: boolean = !get().paused) => set({ paused: state }),
    }),
    {
      name: "kevin-clicker-save",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) =>
      ({
        kev_bucks: state.kev_bucks,
        purchased_upgrades: state.purchased_upgrades,
        xp: state.xp,
        paused: state.paused
      } as GameStore)
    }
  ))
export default useGameStore