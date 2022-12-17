import { output, read, write } from '../utility.js';

const JET_PATTERN = read(17, '');
const CAVERN_WIDTH = 7;
const TARGET_ROCK_COUNT = 1000000000000;
const MINUS_ROCK_TEMPLATE = {
  id: 'm',
  points: [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 2, y: 0 },
    { x: 3, y: 0 },
  ],
};

const PLUS_ROCK_TEMPLATE = {
  id: 'p',
  points: [
    { x: 1, y: 2 },
    { x: 0, y: 1 },
    { x: 1, y: 1 },
    { x: 2, y: 1 },
    { x: 1, y: 0 },
  ],
};

const L_ROCK_TEMPLATE = {
  id: 'l',
  points: [
    { x: 2, y: 2 },
    { x: 2, y: 1 },
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 2, y: 0 },
  ],
};

const I_ROCK_TEMPLATE = {
  id: 'i',
  points: [
    { x: 0, y: 3 },
    { x: 0, y: 2 },
    { x: 0, y: 1 },
    { x: 0, y: 0 },
  ],
};

const SQUARE_ROCK_TEMPLATE = {
  id: 's',
  points: [
    { x: 0, y: 1 },
    { x: 1, y: 1 },
    { x: 0, y: 0 },
    { x: 1, y: 0 },
  ],
};

const TEMPLATE_SPAWN_ORDER = [
  MINUS_ROCK_TEMPLATE,
  PLUS_ROCK_TEMPLATE,
  L_ROCK_TEMPLATE,
  I_ROCK_TEMPLATE,
  SQUARE_ROCK_TEMPLATE,
];

class Rock {
  constructor(template) {
    this.template = template;
    this.points = [];
    this.atRest = false;
    this.restRow = null;
  }

  spawn(offsetX, offsetY) {
    this.points = this.template.points.map((templatePoint) => ({
      x: templatePoint.x + offsetX,
      y: templatePoint.y + offsetY,
    }));
  }

  getMaxVerticalPoint() {
    return Math.max(...this.points.map((point) => point.y));
  }

  fall(occupiedPoints) {
    if (
      this.points
        .map(({ x, y }) => ({ x, y: y - 1 }))
        .some(({ x, y }) => y < 0 || occupiedPoints[`${x},${y}`])
    ) {
      this.atRest = true;
      this.points.forEach(({ x, y }) => (occupiedPoints[`${x},${y}`] = 1));
      const minY = Math.min(...this.points.map((point) => point.y));
      this.restRow = [...Array(7).keys()].map((x) => occupiedPoints[`${x},${minY}`] || '.');
    } else {
      this.points = this.points.map(({ x, y }) => ({ x, y: y - 1 }));
    }
  }

  blow(direction, occupiedPoints) {
    switch (direction) {
      case '<':
        if (
          this.points
            .map(({ x, y }) => ({
              x: x - 1,
              y,
            }))
            .some(({ x, y }) => x < 0 || occupiedPoints[`${x},${y}`])
        ) {
          return;
        } else {
          this.points = this.points.map(({ x, y }) => ({
            x: x - 1,
            y,
          }));
        }
        break;

      case '>':
        if (
          this.points
            .map(({ x, y }) => ({
              x: x + 1,
              y,
            }))
            .some(({ x, y }) => x > CAVERN_WIDTH - 1 || occupiedPoints[`${x},${y}`])
        ) {
          return;
        } else {
          this.points = this.points.map(({ x, y }) => ({
            x: x + 1,
            y,
          }));
        }

        break;
    }
  }
}

const occupiedPoints = {};

let rockCount = 0;
let blowCount = 0;
let currentRock = null;
let highPoint = 0;
let nextAction = 'blow';
let detectedCycle = null;
let heights = new Map();
const dp = [];

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

write(17, 2, `${heightFromCycles + heightFromBeforeCycleStarted + partialCycleHeight}`);
