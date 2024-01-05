import { readOld, write } from '../../utilities/io.js';
import { GAME_DATA } from './common.js';

const [YEAR, DAY, PART] = [2015, 22, 1];

const [bossHealth, bossDamage] = readOld(YEAR, DAY, PART).map((line) => Number(line.match(/\d+/)));

const {
  PLAYER_HEALTH,
  PLAYER_MANA,
  TURN,
  MANA_COST,
  DAMAGE,
  HEAL,
  MANA_GAIN,
  ARMOR,
  EFFECT_TURNS,
} = GAME_DATA;

const stack = [
  {
    health: PLAYER_HEALTH,
    mana: PLAYER_MANA,
    bossHealth,
    shieldEffect: 0,
    poisonEffect: 0,
    rechargeEffect: 0,
    manaSpent: 0,
    turn: TURN.PLAYER,
  },
];

let result = Infinity;

while (stack.length) {
  const current = stack.pop();

  if (current.mana <= 0 || current.health <= 0) continue;
  if (current.manaSpent >= result) continue;

  const nextState = { ...current };

  // EFFECTS BEFORE TURN
  if (nextState.poisonEffect) {
    nextState.bossHealth -= DAMAGE.POISON;
    nextState.poisonEffect = Math.max(0, nextState.poisonEffect - 1);

    if (nextState.bossHealth <= 0) {
      result = Math.min(result, nextState.manaSpent);
    }
  }

  if (nextState.shieldEffect) {
    nextState.shieldEffect = Math.max(0, nextState.shieldEffect - 1);
  }

  if (nextState.rechargeEffect) {
    nextState.mana += MANA_GAIN.RECHARGE;
    nextState.rechargeEffect = Math.max(0, nextState.rechargeEffect - 1);
  }

  if (nextState.turn === TURN.PLAYER) {
    nextState.turn = TURN.BOSS;

    if (nextState.mana >= MANA_COST.MISSILE) {
      const missileCastedState = {
        ...nextState,
        bossHealth: nextState.bossHealth - DAMAGE.MISSILE,
        mana: nextState.mana - MANA_COST.MISSILE,
        manaSpent: nextState.manaSpent + MANA_COST.MISSILE,
      };

      if (missileCastedState.bossHealth <= 0) {
        result = Math.min(result, missileCastedState.manaSpent);
      } else {
        stack.push(missileCastedState);
      }
    }

    if (nextState.mana >= MANA_COST.DRAIN) {
      const drainCastedState = {
        ...nextState,
        bossHealth: nextState.bossHealth - DAMAGE.DRAIN,
        health: nextState.health + HEAL.DRAIN,
        mana: nextState.mana - MANA_COST.DRAIN,
        manaSpent: nextState.manaSpent + MANA_COST.DRAIN,
      };

      if (drainCastedState.bossHealth <= 0) {
        result = Math.min(result, drainCastedState.manaSpent);
      } else {
        stack.push(drainCastedState);
      }
    }

    if (nextState.mana >= MANA_COST.POISON && !nextState.poisonEffect) {
      const poisonCastedState = {
        ...nextState,
        poisonEffect: EFFECT_TURNS.POISON,
        mana: nextState.mana - MANA_COST.POISON,
        manaSpent: nextState.manaSpent + MANA_COST.POISON,
      };

      stack.push(poisonCastedState);
    }

    if (nextState.mana >= MANA_COST.SHIELD && !nextState.shieldEffect) {
      const shieldCastedState = {
        ...nextState,
        shieldEffect: EFFECT_TURNS.SHIELD,
        mana: nextState.mana - MANA_COST.SHIELD,
        manaSpent: nextState.manaSpent + MANA_COST.SHIELD,
      };

      stack.push(shieldCastedState);
    }

    if (nextState.mana >= MANA_COST.RECHARGE && !nextState.rechargeEffect) {
      const rechargeCastedState = {
        ...nextState,
        rechargeEffect: EFFECT_TURNS.RECHARGE,
        mana: nextState.mana - MANA_COST.RECHARGE,
        manaSpent: nextState.manaSpent + MANA_COST.RECHARGE,
      };

      stack.push(rechargeCastedState);
    }
  } else {
    nextState.turn = TURN.PLAYER;
    const damage = bossDamage - (nextState.shieldEffect ? ARMOR.SHIELD : 0);
    nextState.health -= damage;

    if (nextState.health > 0) {
      stack.push(nextState);
    }
  }
}

write(YEAR, DAY, PART, result);
