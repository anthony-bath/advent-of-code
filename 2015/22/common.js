const PLAYER_HEALTH = 50;
const PLAYER_MANA = 500;

const TURN = {
  PLAYER: 0,
  BOSS: 1,
};

const MANA_COST = {
  MISSILE: 53,
  DRAIN: 73,
  SHIELD: 113,
  POISON: 173,
  RECHARGE: 229,
};

const DAMAGE = {
  POISON: 3,
  MISSILE: 4,
  DRAIN: 2,
};

const HEAL = {
  DRAIN: 2,
};

const MANA_GAIN = {
  RECHARGE: 101,
};

const ARMOR = {
  SHIELD: 7,
};

const EFFECT_TURNS = {
  POISON: 6,
  SHIELD: 6,
  RECHARGE: 5,
};

export const GAME_DATA = {
  PLAYER_HEALTH,
  PLAYER_MANA,
  TURN,
  MANA_COST,
  DAMAGE,
  HEAL,
  MANA_GAIN,
  ARMOR,
  EFFECT_TURNS,
};
