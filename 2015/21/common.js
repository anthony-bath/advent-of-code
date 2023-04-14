export const weaponData = [
  { name: 'Dagger', cost: 8, damage: 4, armor: 0 },
  { name: 'Shortsword', cost: 10, damage: 5, armor: 0 },
  { name: 'Warhammer', cost: 25, damage: 6, armor: 0 },
  { name: 'Longsword', cost: 40, damage: 7, armor: 0 },
  { name: 'Greataxe', cost: 74, damage: 8, armor: 0 },
];

export const armorData = [
  { name: 'Leather', cost: 13, damage: 0, armor: 1 },
  { name: 'Chainmail', cost: 31, damage: 0, armor: 2 },
  { name: 'Splintmail', cost: 53, damage: 0, armor: 3 },
  { name: 'Bandedmail', cost: 75, damage: 0, armor: 4 },
  { name: 'Platemail', cost: 102, damage: 0, armor: 5 },
];

export const ringData = [
  { name: 'Damage +1', cost: 25, damage: 1, armor: 0 },
  { name: 'Damage +2', cost: 50, damage: 2, armor: 0 },
  { name: 'Damage +3', cost: 100, damage: 3, armor: 0 },
  { name: 'Armor +1', cost: 20, damage: 0, armor: 1 },
  { name: 'Armor +2', cost: 40, damage: 0, armor: 2 },
  { name: 'Armor +3', cost: 80, damage: 0, armor: 3 },
];

class Loadout {
  cost = 0;
  damage = 0;
  armor = 0;

  constructor(slots) {
    for (const slot of slots) {
      this.cost += slot.cost;
      this.damage += slot.damage;
      this.armor += slot.armor;
    }
  }
}

const loadouts = [];

for (const weapon of weaponData) {
  loadouts.push(new Loadout([weapon]));

  for (const armor of armorData) {
    loadouts.push(new Loadout([weapon, armor]));

    for (let i = 0; i < ringData.length; i++) {
      loadouts.push(new Loadout([weapon, ringData[i]]));
      loadouts.push(new Loadout([weapon, armor, ringData[i]]));

      for (let j = i + 1; j < ringData.length; j++) {
        loadouts.push(new Loadout([weapon, ringData[i], ringData[j]]));
        loadouts.push(new Loadout([weapon, armor, ringData[i], ringData[j]]));
      }
    }
  }
}

export { loadouts };

export function simulate(loadout, bossStats) {
  const playerHP = 100;
  const [bossHP, bossDamage, bossArmor] = bossStats;

  const bossTurnsToDeath = Math.ceil(bossHP / Math.max(loadout.damage - bossArmor, 1));
  const playerTurnsToDeah = Math.ceil(playerHP / Math.max(bossDamage - loadout.armor, 1));

  return playerTurnsToDeah >= bossTurnsToDeath;
}
