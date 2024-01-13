import { getGroups, simulate, TEAM_SIZE } from './common.js';

export function part1({ lines }) {
  const groups = getGroups(lines);

  const ImmuneSystem = new Map();
  const Infection = new Map();

  for (let i = 0; i < TEAM_SIZE; i++) {
    ImmuneSystem.set(i + 1, groups[i]);
    Infection.set(i + TEAM_SIZE + 1, groups[i + TEAM_SIZE]);
  }

  const result = simulate(ImmuneSystem, Infection);

  return result.remainingUnits;
}
