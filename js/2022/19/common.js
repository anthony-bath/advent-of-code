export const TYPE = {
  ORE: 0,
  CLAY: 1,
  OBSIDIAN: 2,
  GEODE: 3,
};

const expression =
  /Blueprint (?<id>\d+): Each ore robot costs (?<oreRobotOreCost>\d+) ore. Each clay robot costs (?<clayRobotOreCost>\d+) ore. Each obsidian robot costs (?<obsidianRobotOreCost>\d+) ore and (?<obsidianRobotClayCost>\d+) clay. Each geode robot costs (?<geodeRobotOreCost>\d+) ore and (?<geodeRobotObsidianCost>\d+) obsidian./;

export function getBlueprints(lines) {
  return lines.map((line) => {
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
}
