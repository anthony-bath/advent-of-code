import { TYPE, getBlueprints } from './common.js';

const { max, ceil } = Math;

export function part2({ lines }) {
  const blueprints = getBlueprints(lines).slice(0, 3);
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

    const maxOreCost = max(
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
      maxSoFar = max(result, maxSoFar);
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
      const waitTime = max(
        0,
        ceil((blueprint.oreRobotOreCost - resources[TYPE.ORE]) / robots[TYPE.ORE])
      );

      if (minutes - waitTime > 0) {
        options.push([waitTime, TYPE.ORE, [blueprint.oreRobotOreCost, 0, 0]]);
      }
    }

    if (robots[TYPE.CLAY] < maxRobots[TYPE.CLAY]) {
      const waitTime = max(
        0,
        ceil((blueprint.clayRobotOreCost - resources[TYPE.ORE]) / robots[TYPE.ORE])
      );

      if (minutes - waitTime > 0) {
        options.push([waitTime, TYPE.CLAY, [blueprint.clayRobotOreCost, 0, 0]]);
      }
    }

    if (robots[TYPE.OBSIDIAN] < maxRobots[TYPE.OBSIDIAN] && robots[TYPE.CLAY] > 0) {
      const oreRequiredTime = max(
        0,
        ceil((blueprint.obsidianRobotOreCost - resources[TYPE.ORE]) / robots[TYPE.ORE])
      );

      const clayRequiredTime = max(
        0,
        ceil((blueprint.obsidianRobotClayCost - resources[TYPE.CLAY]) / robots[TYPE.CLAY])
      );

      const waitTime = max(oreRequiredTime, clayRequiredTime);

      if (minutes - waitTime > 0) {
        options.push([
          waitTime,
          TYPE.OBSIDIAN,
          [blueprint.obsidianRobotOreCost, blueprint.obsidianRobotClayCost, 0],
        ]);
      }
    }

    if (robots[TYPE.OBSIDIAN] > 0) {
      const oreRequiredTime = max(
        0,
        ceil((blueprint.geodeRobotOreCost - resources[TYPE.ORE]) / robots[TYPE.ORE])
      );

      const obsidianRequiredTime = max(
        0,
        ceil((blueprint.geodeRobotObsidianCost - resources[TYPE.OBSIDIAN]) / robots[TYPE.OBSIDIAN])
      );

      const waitTime = max(oreRequiredTime, obsidianRequiredTime);

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

  return allGeodes.reduce((total, geodes) => total * geodes, 1);
}
