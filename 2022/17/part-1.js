import { Rock, TEMPLATE_SPAWN_ORDER } from './common.js';

export function part1({ data }) {
  const JET_PATTERN = data.split('');
  const TARGET_ROCK_COUNT = 2022;

  let rockCount = 0;
  let blowCount = 0;
  let currentRock = null;
  let highPoint = 0;
  let nextAction = 'blow';
  const occupiedPoints = {};

  while (rockCount < TARGET_ROCK_COUNT) {
    if (!currentRock) {
      currentRock = new Rock(TEMPLATE_SPAWN_ORDER[rockCount % TEMPLATE_SPAWN_ORDER.length]);
      currentRock.spawn(2, highPoint + 3);
      nextAction = 'blow';
    }

    switch (nextAction) {
      case 'blow':
        const direction = JET_PATTERN[blowCount % JET_PATTERN.length];
        currentRock.blow(direction, occupiedPoints);
        blowCount++;
        nextAction = 'fall';
        break;

      case 'fall':
        currentRock.fall(occupiedPoints);

        if (currentRock.atRest) {
          rockCount++;
          highPoint = Math.max(highPoint, currentRock.getMaxVerticalPoint() + 1);
          currentRock = null;
        } else {
          nextAction = 'blow';
        }
        break;
    }
  }

  return highPoint;
}
