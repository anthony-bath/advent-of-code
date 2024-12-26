const DAMAGE_TYPE = {
  SLASHING: 0,
  BLUDGEONING: 1,
  FIRE: 2,
  RADIATION: 3,
  COLD: 4,
};

export const GROUP_TYPE = {
  IMMUNE_SYSTEM: 0,
  INFECTION: 1,
};

export const TEAM_SIZE = 10;

export function getGroups(lines) {
  const expr =
    /(\d+) units each with (\d+) hit points (\([\w\s,;]+\))?\s?with an attack that does (\d+) (\w+) damage at initiative (\d+)/;

  const groups = [];

  lines.forEach((line) => {
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

  return groups;
}

const SortOption = {
  byBestTarget(forGroup) {
    return (g1, g2) => {
      const g1Damage = forGroup.damage(g1);
      const g2Damage = forGroup.damage(g2);

      if (g2Damage === g1Damage) {
        if (g2.power() === g1.power()) {
          return g2.initiative - g1.initiative;
        } else {
          return g2.power() - g1.power();
        }
      } else {
        return g2Damage - g1Damage;
      }
    };
  },
  bySelectionOrder(g1, g2) {
    if (g2.power() === g1.power()) {
      return g2.initiative - g1.initiative;
    }

    return g2.power() - g1.power();
  },
  byAttackOrder(g1, g2) {
    return g2.initiative - g1.initiative;
  },
};

export function simulate(ImmuneSystem, Infection, boost = 0) {
  for (const group of ImmuneSystem.values()) {
    group.setBoost(boost);
  }

  let battles = 0;

  while (Infection.size && ImmuneSystem.size) {
    // ----------------------------------------------------------------------------------------
    // STALEMATE EVALUATION
    // ----------------------------------------------------------------------------------------
    battles++;

    if (battles >= 2500) {
      // Stalemate
      return { winner: -1 };
    }

    // ----------------------------------------------------------------------------------------
    // TARGET SELECTION PHASE
    // ----------------------------------------------------------------------------------------
    const infectionGroups = [...Infection.values()];
    const immuneSystemGroups = [...ImmuneSystem.values()];

    const groups = [...infectionGroups, ...immuneSystemGroups].sort(SortOption.bySelectionOrder);

    for (const group of groups) {
      let targets;

      if (group.type === GROUP_TYPE.IMMUNE_SYSTEM) {
        targets = infectionGroups;
      } else {
        targets = immuneSystemGroups;
      }

      targets.sort(SortOption.byBestTarget(group));

      for (const target of targets) {
        if (!target.attackedByGroup && group.damage(target) > 0) {
          group.setAttackingGroup(target);
          target.setAttackedByGroup(group);
          break;
        }
      }
    }

    // ----------------------------------------------------------------------------------------
    // ATTACK PHASE
    // ----------------------------------------------------------------------------------------
    groups.sort(SortOption.byAttackOrder);

    for (const group of groups) {
      group.attack();
    }

    // ----------------------------------------------------------------------------------------
    // CLEAN-UP PHASE
    // ----------------------------------------------------------------------------------------
    for (const group of groups) {
      group.setAttackedByGroup(null);
      group.setAttackingGroup(null);

      if (group.count === 0) {
        if (group.type === GROUP_TYPE.IMMUNE_SYSTEM) {
          ImmuneSystem.delete(group.id);
        } else {
          Infection.delete(group.id);
        }
      }
    }
  }

  const winner = Infection.size ? Infection : ImmuneSystem;

  return {
    battles,
    boost,
    winner: Infection.size ? GROUP_TYPE.INFECTION : GROUP_TYPE.IMMUNE_SYSTEM,
    remainingUnits: [...winner.values()].reduce((count, group) => count + group.count, 0),
  };
}

export class Group {
  constructor(id, count, hp, weaknesses, immunities, damage, damageType, initiative, type) {
    this.id = id;
    this.count = Number(count);
    this.initialCount = this.count;
    this.hp = Number(hp);
    this.weaknesses = weaknesses;
    this.immunities = immunities;
    this.baseDamage = Number(damage);
    this.damageType = damageType;
    this.initiative = Number(initiative);
    this.type = type;
    this.boost = 0;
  }

  reset() {
    this.count = this.initialCount;
  }

  setBoost(boost) {
    this.boost = boost;
  }

  power() {
    return this.count * (this.baseDamage + this.boost);
  }

  damage(toGroup) {
    toGroup = toGroup || this.attackingGroup;
    const attackDamage = this.power();

    return toGroup.weaknesses.includes(this.damageType)
      ? 2 * attackDamage
      : toGroup.immunities.includes(this.damageType)
      ? 0
      : attackDamage;
  }

  setAttackingGroup(attackingGroup) {
    this.attackingGroup = attackingGroup;
  }

  setAttackedByGroup(attackedByGroup) {
    this.attackedByGroup = attackedByGroup;
  }

  receiveDamage() {
    const lostUnits = Math.floor(this.attackedByGroup.damage(this) / this.hp);
    this.count = Math.max(0, this.count - lostUnits);
  }

  attack() {
    if (this.count === 0 || !this.attackingGroup) return;
    this.attackingGroup.receiveDamage();
  }
}
