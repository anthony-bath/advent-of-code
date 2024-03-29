import { Rock, TEMPLATE_SPAWN_ORDER } from './common.js';

export function part2({ data }) {
  const JET_PATTERN = data.split('');
  const TARGET_ROCK_COUNT = 1000000000000;

  let rockCount = 0;
  let blowCount = 0;
  let currentRock = null;
  let highPoint = 0;
  let nextAction = 'blow';
  let detectedCycle = null;
  let heights = new Map();
  const dp = [];
  const occupiedPoints = {};

  while (true) {
    const direction = JET_PATTERN[blowCount % JET_PATTERN.length];

    if (!currentRock) {
      currentRock = new Rock(TEMPLATE_SPAWN_ORDER[rockCount % TEMPLATE_SPAWN_ORDER.length]);
      currentRock.spawn(2, highPoint + 3);
      nextAction = 'blow';
    }

    switch (nextAction) {
      case 'blow':
        currentRock.blow(direction, occupiedPoints);
        blowCount++;
        nextAction = 'fall';
        break;

      case 'fall':
        currentRock.fall(occupiedPoints);

        if (currentRock.atRest) {
          rockCount++;
          highPoint = Math.max(highPoint, currentRock.getMaxVerticalPoint() + 1);
          heights.set(rockCount, highPoint);

          const blowIndex = (blowCount - 1) % JET_PATTERN.length;
          const key = `${currentRock.template.id}-${blowIndex}-${currentRock.restRow}`;

          if (!dp[key]) {
            dp[key] = { highPoint, rockCount };
          } else {
            detectedCycle = {
              cycleStart: dp[key].rockCount,
              heightAtCycleStart: dp[key].highPoint,
              cycleSize: rockCount - dp[key].rockCount,
              heightPerCycle: highPoint - dp[key].highPoint,
            };
          }

          currentRock = null;
        } else {
          nextAction = 'blow';
        }
        break;
    }

    if (detectedCycle) {
      break;
    }
  }

  const { cycleStart, cycleSize, heightAtCycleStart, heightPerCycle } = detectedCycle;

  const completeCycles = Math.floor((TARGET_ROCK_COUNT - cycleStart) / cycleSize);
  const heightFromCycles = completeCycles * heightPerCycle;
  const heightFromBeforeCycleStarted = heightAtCycleStart;
  const partialCycleSize = TARGET_ROCK_COUNT - cycleStart - completeCycles * cycleSize;
  const partialCycleHeight = heights.get(cycleStart + partialCycleSize) - heightAtCycleStart;

  return heightFromCycles + heightFromBeforeCycleStarted + partialCycleHeight;
}
