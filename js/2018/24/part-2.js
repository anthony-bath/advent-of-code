import { getGroups, simulate, TEAM_SIZE, GROUP_TYPE } from './common.js';

export function part2({ lines }) {
  const groups = getGroups(lines);

  let boostFloor = 1;
  let boostCeiling = 100;
  let boost = 50;
  let remainingUnits;

  while (true) {
    const ImmuneSystem = new Map();
    const Infection = new Map();

    for (let i = 0; i < TEAM_SIZE; i++) {
      ImmuneSystem.set(i + 1, groups[i]);
      Infection.set(i + TEAM_SIZE + 1, groups[i + TEAM_SIZE]);
    }

    const result = simulate(ImmuneSystem, Infection, boost);

    if (result.winner === GROUP_TYPE.IMMUNE_SYSTEM) {
      boostCeiling = boost;
      boost = (boost + boostFloor) >> 1;
      remainingUnits = result.remainingUnits;
    } else {
      boostFloor = boost;
      boost = (boost + boostCeiling) >> 1;
    }

    if (boostCeiling - boostFloor <= 1) {
      return remainingUnits;
    }

    for (const group of groups) {
      group.reset();
    }
  }
}
