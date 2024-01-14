import { Moon, sum } from './common.js';
import { pairs } from '../../utilities/array.js';

export function part1({ lines }) {
  const moons = [];

  lines.forEach((line) => {
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

  return sum(moons.map((moon) => moon.energy()));
}
