import { create } from "zustand";
import { persist, createJSONStorage, StateStorage } from 'zustand/middleware'
import { upgrades } from "../content/upgrades";
import supabase from "./supabase";
import throttle from "lodash.throttle"

const storage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    let { data: { session }, error: session_error } = await supabase.auth.getSession()
    if (session_error || !session) {
      return localStorage.getItem(name) || null
    }

    let { data, error: data_error } = await supabase.from("saves").select("*").eq("name", name).eq("user", session.user.id).limit(1).single()
    if (!data || data_error) return null;

    return JSON.stringify(data.value);
  },
  setItem: throttle(async (name: string, value: string): Promise<void> => {
    let { data: { session }, error } = await supabase.auth.getSession()
    if (error || !session) {
      localStorage.setItem(name, value)
      return;
    }

    await supabase.from("saves").upsert({ value: JSON.parse(value), user: session.user.id, name }).eq("user", session.user.id).eq("name", name)
  }, 3000),
  removeItem: async (name: string): Promise<void> => {
    let { data: { session }, error } = await supabase.auth.getSession()
    if (error || !session) {
      localStorage.removeItem(name)
      return;
    }

    await supabase.from("saves").delete().eq("user", session.user.id).eq("name", name)
  },
}

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

  cookie_mode: boolean
  toggleCookieMode: (state?: boolean) => void

  support_shown: boolean
  toggleSupportShown: (state?: boolean) => void

  chat_shown: boolean
  toggleChatShown: (state?: boolean) => void

}

const level_constant = 0.025;
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

      cookie_mode: false,
      toggleCookieMode: (state: boolean = !get().cookie_mode) => set({ cookie_mode: state }),

      support_shown: false,
      toggleSupportShown: (state: boolean = !get().support_shown) => set({ support_shown: state }),

      chat_shown: false,
      toggleChatShown: (state: boolean = !get().chat_shown) => set({ chat_shown: state }),

    }),
    {
      name: "kevin-clicker-save",
      storage: createJSONStorage(() => storage),
      partialize: (state) =>
      ({
        kev_bucks: state.kev_bucks,
        purchased_upgrades: state.purchased_upgrades,
        xp: state.xp,
        paused: state.paused,
        cookie_mode: state.cookie_mode,
      } as GameStore)
    }
  ))
export default useGameStore