import { readOld, write } from '../../utilities/io.js';
import { Moon, sum } from './common.js';
import { pairs } from '../../utilities/array.js';

const [YEAR, DAY, PART] = [2019, 12, 1];

const moons = [];

readOld(YEAR, DAY, PART).forEach((line) => {
  const position = line.match(/-?\d+/g).map((n) => Number(n));
  moons.push(new Moon(position));
});

const STEPS = 1000;

for (let step = 0; step < STEPS; step++) {
  for (const [moon1, moon2] of pairs(moons)) {
    moon1.applyGravity(moon2);
  }

  for (const moon of moons) {
    moon.applyVelocity();
  }
}

const result = sum(moons.map((moon) => moon.energy()));

write(YEAR, DAY, PART, result);
