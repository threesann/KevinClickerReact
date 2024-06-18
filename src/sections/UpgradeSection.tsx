import { useEffect } from "react";
import upgrades from "../content/upgrades";
import useGameStore from "../lib/store";
import UpgradeDisplay from "./upgrades/UpgradeDisplay";

interface ComponentProps { }
export default function UpgradeSection({ }: ComponentProps) {
  const calculateKevBucksPerSecond = useGameStore(state => state.calculateKevBucksPerSecond)
  const incrementKevBucks = useGameStore(state => state.incrementKevBucks)

  useEffect(() => {
    let interval = setInterval(() => {
      let kps = calculateKevBucksPerSecond()
      incrementKevBucks(kps)

      let upgradeLevels = useGameStore.getState().purchased_upgrades

      for (let upgrade of upgrades) {
        let level = upgradeLevels[upgrade.id] ?? 0
        if (upgrade.effects) upgrade.effects(level)
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [])


  return <div className='w-full min-h-0'>
    <h2 className="text-7xl uppercase">Upgrades</h2>
    <div className="flex flex-col gap-3 lg:overflow-y-scroll h-full min-h-0 no-scrollbar">
      {upgrades.map(upgrade => <UpgradeDisplay key={upgrade.id} upgrade={upgrade} />)}
    </div>
  </div>
}