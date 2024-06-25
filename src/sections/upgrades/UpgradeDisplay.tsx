import { useMemo } from "react";
import { upgrades } from "../../content/upgrades";
import { Upgrade } from "../../content/content.types";
import useGameStore from "../../lib/store";

interface ComponentProps {
  upgrade: Upgrade;
}
export default function UpgradeDisplay({ upgrade }: ComponentProps) {
  const kevBucks = useGameStore(store => store.kev_bucks)
  const incrementUpgradeLevel = useGameStore(store => store.incrementUpgradeLevel)
  const deductKevBucks = useGameStore(store => store.deductKevBucks)
  
  const upgradeLevel = useGameStore(store => store.purchased_upgrades[upgrade.id] ?? 0)
  
  const parentUpgrade = useMemo(() => upgrades.find(u => u.id === upgrade.parent_upgrade), [upgrade.parent_upgrade])
  const parentLevel = useGameStore(store => parentUpgrade ? store.purchased_upgrades[parentUpgrade.id] ?? 0 : null)

  const grandFatherUpgrade = useMemo(() => upgrades.find(u => u.id === parentUpgrade?.parent_upgrade) ?? null, [parentUpgrade?.parent_upgrade])
  const grandFatherLevel = useGameStore(store => grandFatherUpgrade ? store.purchased_upgrades[grandFatherUpgrade.id] ?? 0 : null)

  const incrementXP = useGameStore(store => store.incrementXP)

  const price = useMemo(() => upgrade.price(upgradeLevel), [upgradeLevel])
  const isLocked = typeof parentLevel === "number" && parentLevel < 10 || (parentUpgrade && (typeof parentLevel !== "number"))
  const isHint = typeof grandFatherLevel === "number" ? (grandFatherLevel ?? 0) >= 10 : true

  function purchaseUpgrade() {
    if (kevBucks < price) return;
    let upgradeIndex = (upgrades.findIndex(x => x.id === upgrade.id) ?? 0) + 1
    deductKevBucks(price)
    incrementUpgradeLevel(upgrade.id)
    incrementXP(Math.ceil((upgradeIndex ** 4) + (upgradeLevel + 1) ** 2.5))
  }

  if (isLocked) return <div className="px-3 py-4 bg-black/30 flex items-center justify-center flex-col">
    <img src="/assets/icons/locked.png" className="h-8 w-8" />
    {isHint && <span>
      Upgrade{" "}
      <span className="uppercase">{upgrades.find(upgr => upgr.id === upgrade.parent_upgrade)?.name}</span>
      {" "}to level 10!
    </span>}
  </div>

  return <button onClick={purchaseUpgrade} className="bg-black/30 hover:bg-black/50 flex-shrink-0 p-3 text-left flex gap-3 items-center justify-between">
    <div className="flex gap-3 items-center">
      <img src={upgrade.image} className="h-14 w-14" />
      <div>
        <h3 className="text-xl uppercase leading-tight">{upgrade.name}</h3>
        <p className="leading-tight text-white/75">{upgrade.description}</p>
      </div>
    </div>
    <div>
      <p className="text-white/75 text-nowrap text-right">Level {upgradeLevel}</p>
      <div className="text-white/75 flex gap-1.5 justify-end items-center">
        <span className={`text-xl ${kevBucks >= price ? "text-green-500" : "text-red-500"}`}>{price}</span>
        <img src="/assets/kevbuck.gif" className="h-5 w-5" />
      </div>
      <p className="text-white/75 text-nowrap text-right">{upgrade.kps(upgradeLevel)} KB/s</p>
    </div>
  </button>
}