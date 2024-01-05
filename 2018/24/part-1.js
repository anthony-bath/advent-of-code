import { readOld, write } from '../../utilities/io.js';
import { DAMAGE_TYPE, GROUP_TYPE, Group, simulate } from './common.js';

const [YEAR, DAY, PART] = [2018, 24, 1];
const TEAM_SIZE = 10;
const expr =
  /(\d+) units each with (\d+) hit points (\([\w\s,;]+\))?\s?with an attack that does (\d+) (\w+) damage at initiative (\d+)/;

const groups = [];

readOld(YEAR, DAY, PART).forEach((line) => {
  if (!line || line.startsWith('Immune') || line.startsWith('Infection')) return;

  const [_, count, hp, modifiers, baseDamage, damageType, initiative] = line.match(expr);

  let weaknesses = [];
  let immunities = [];

  if (modifiers) {
    const parts = modifiers.replace(/[\(\)]/g, '').split('; ');

    for (const part of parts) {
      const [type, modsRaw] = part.split(' to ');
      const mods = modsRaw.split(', ');

      if (type === 'weak') {
        weaknesses = mods.map((mod) => DAMAGE_TYPE[mod.toUpperCase()]);
      } else {
        immunities = mods.map((mod) => DAMAGE_TYPE[mod.toUpperCase()]);
      }
    }
  }

  groups.push(
    new Group(
      groups.length + 1,
      count,
      hp,
      weaknesses,
      immunities,
      baseDamage,
      DAMAGE_TYPE[damageType.toUpperCase()],
      initiative,
      groups.length < TEAM_SIZE ? GROUP_TYPE.IMMUNE_SYSTEM : GROUP_TYPE.INFECTION
    )
  );
});

const ImmuneSystem = new Map();
const Infection = new Map();

for (let i = 0; i < TEAM_SIZE; i++) {
  ImmuneSystem.set(i + 1, groups[i]);
  Infection.set(i + TEAM_SIZE + 1, groups[i + TEAM_SIZE]);
}

const result = simulate(ImmuneSystem, Infection);

write(YEAR, DAY, PART, result.remainingUnits);
