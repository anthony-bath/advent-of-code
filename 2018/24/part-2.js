import { getGroups, simulate, TEAM_SIZE, GROUP_TYPE } from './common.js';

export function part2({ lines }) {
  const groups = getGroups(lines);
  let boost = 1;
  let result = null;

  while (true) {
    const ImmuneSystem = new Map();
    const Infection = new Map();

    for (let i = 0; i < TEAM_SIZE; i++) {
      ImmuneSystem.set(i + 1, groups[i]);
      Infection.set(i + TEAM_SIZE + 1, groups[i + TEAM_SIZE]);
    }

    result = simulate(ImmuneSystem, Infection, boost++);

    if (result.winner === GROUP_TYPE.IMMUNE_SYSTEM) {
      break;
    } else {
      for (const group of groups) {
        group.reset();
      }
    }
  }

  return result.remainingUnits;
}
