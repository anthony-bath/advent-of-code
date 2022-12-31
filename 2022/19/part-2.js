import { read, write } from '../../utility.js';

const [YEAR, DAY, PART] = [2022, 19, 2];

const expression =
  /Blueprint (?<id>\d+): Each ore robot costs (?<oreRobotOreCost>\d+) ore. Each clay robot costs (?<clayRobotOreCost>\d+) ore. Each obsidian robot costs (?<obsidianRobotOreCost>\d+) ore and (?<obsidianRobotClayCost>\d+) clay. Each geode robot costs (?<geodeRobotOreCost>\d+) ore and (?<geodeRobotObsidianCost>\d+) obsidian./;

const TYPE = {
  ORE: 0,
  CLAY: 1,
  OBSIDIAN: 2,
  GEODE: 3,
};

const blueprints = read(YEAR, DAY)
  .slice(0, 3)
  .map((line) => {
    const {
      id,
      oreRobotOreCost,
      clayRobotOreCost,
      obsidianRobotOreCost,
      obsidianRobotClayCost,
      geodeRobotOreCost,
      geodeRobotObsidianCost,
    } = line.match(expression).groups;

    return {
      id: Number(id),
      oreRobotOreCost: Number(oreRobotOreCost),
      clayRobotOreCost: Number(clayRobotOreCost),
      obsidianRobotOreCost: Number(obsidianRobotOreCost),
      obsidianRobotClayCost: Number(obsidianRobotClayCost),
      geodeRobotOreCost: Number(geodeRobotOreCost),
      geodeRobotObsidianCost: Number(geodeRobotObsidianCost),
    };
  });

const allGeodes = [];

let maxSoFar;
for (const blueprint of blueprints) {
  const {
    obsidianRobotClayCost,
    geodeRobotObsidianCost,
    oreRobotOreCost,
    obsidianRobotOreCost,
    clayRobotOreCost,
    geodeRobotOreCost,
  } = blueprint;

  const maxOreCost = Math.max(
    oreRobotOreCost,
    clayRobotOreCost,
    obsidianRobotOreCost,
    geodeRobotOreCost
  );

  const initialState = {
    maxRobots: [maxOreCost, obsidianRobotClayCost, geodeRobotObsidianCost],
    resources: [0, 0, 0, 0],
    robots: [1, 0, 0, 0],
    minutes: 32,
  };

  const cache = {};
  maxSoFar = -Infinity;
  const geodes = dfs(initialState, blueprint, cache);
  allGeodes.push(geodes);
}

function getCacheKey(state) {
  const { minutes, robots, resources } = state;
  return `${minutes}-${robots.join('-')}-${resources.join('-')}`;
}

function dfs(state, blueprint, cache) {
  if (state.minutes === 0) {
    const result = state.resources[TYPE.GEODE];
    maxSoFar = Math.max(result, maxSoFar);
    return maxSoFar;
  }

  if (state.minutes === 1) {
    return state.resources[TYPE.GEODE] + state.robots[TYPE.GEODE];
  }

  if (
    state.resources[TYPE.GEODE] + state.minutes * (state.robots[TYPE.GEODE] + state.minutes) <
    maxSoFar
  ) {
    return 0;
  }

  const { resources, robots, maxRobots, minutes } = state;
  const key = getCacheKey(state);

  if (cache[key]) {
    return cache[key];
  }

  const options = [];

  if (robots[TYPE.ORE] < maxRobots[TYPE.ORE]) {
    const waitTime = Math.max(
      0,
      Math.ceil((blueprint.oreRobotOreCost - resources[TYPE.ORE]) / robots[TYPE.ORE])
    );

    if (minutes - waitTime > 0) {
      options.push([waitTime, TYPE.ORE, [blueprint.oreRobotOreCost, 0, 0]]);
    }
  }

  if (robots[TYPE.CLAY] < maxRobots[TYPE.CLAY]) {
    const waitTime = Math.max(
      0,
      Math.ceil((blueprint.clayRobotOreCost - resources[TYPE.ORE]) / robots[TYPE.ORE])
    );

    if (minutes - waitTime > 0) {
      options.push([waitTime, TYPE.CLAY, [blueprint.clayRobotOreCost, 0, 0]]);
    }
  }

  if (robots[TYPE.OBSIDIAN] < maxRobots[TYPE.OBSIDIAN] && robots[TYPE.CLAY] > 0) {
    const oreRequiredTime = Math.max(
      0,
      Math.ceil((blueprint.obsidianRobotOreCost - resources[TYPE.ORE]) / robots[TYPE.ORE])
    );

    const clayRequiredTime = Math.max(
      0,
      Math.ceil((blueprint.obsidianRobotClayCost - resources[TYPE.CLAY]) / robots[TYPE.CLAY])
    );

    const waitTime = Math.max(oreRequiredTime, clayRequiredTime);

    if (minutes - waitTime > 0) {
      options.push([
        waitTime,
        TYPE.OBSIDIAN,
        [blueprint.obsidianRobotOreCost, blueprint.obsidianRobotClayCost, 0],
      ]);
    }
  }

  if (robots[TYPE.OBSIDIAN] > 0) {
    const oreRequiredTime = Math.max(
      0,
      Math.ceil((blueprint.geodeRobotOreCost - resources[TYPE.ORE]) / robots[TYPE.ORE])
    );

    const obsidianRequiredTime = Math.max(
      0,
      Math.ceil(
        (blueprint.geodeRobotObsidianCost - resources[TYPE.OBSIDIAN]) / robots[TYPE.OBSIDIAN]
      )
    );

    const waitTime = Math.max(oreRequiredTime, obsidianRequiredTime);

    if (minutes - waitTime > 0) {
      options.push([
        waitTime,
        TYPE.GEODE,
        [blueprint.geodeRobotOreCost, 0, blueprint.geodeRobotObsidianCost],
      ]);
    }
  }

  if (options.length === 0) {
    return resources[TYPE.GEODE] + minutes * robots[TYPE.GEODE];
  }

  let maxGeodes = 0;
  options.forEach(([waitTime, botType, cost]) => {
    const nextState = {
      ...state,
      minutes: minutes - (waitTime + 1),
      robots: [
        robots[TYPE.ORE] + (botType === TYPE.ORE ? 1 : 0),
        robots[TYPE.CLAY] + (botType === TYPE.CLAY ? 1 : 0),
        robots[TYPE.OBSIDIAN] + (botType === TYPE.OBSIDIAN ? 1 : 0),
        robots[TYPE.GEODE] + (botType === TYPE.GEODE ? 1 : 0),
      ],
      resources: [
        resources[TYPE.ORE] + (waitTime + 1) * robots[TYPE.ORE] - cost[TYPE.ORE],
        resources[TYPE.CLAY] + (waitTime + 1) * robots[TYPE.CLAY] - cost[TYPE.CLAY],
        resources[TYPE.OBSIDIAN] + (waitTime + 1) * robots[TYPE.OBSIDIAN] - cost[TYPE.OBSIDIAN],
        resources[TYPE.GEODE] + (waitTime + 1) * robots[TYPE.GEODE],
      ],
    };

    const geodes = dfs(nextState, blueprint, cache);

    if (geodes > maxGeodes) {
      maxGeodes = geodes;
    }
  });

  cache[key] = maxGeodes;
  return maxGeodes;
}

write(
  YEAR,
  DAY,
  PART,
  allGeodes.reduce((total, geodes) => total * geodes, 1)
);
