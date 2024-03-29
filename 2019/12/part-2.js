import { Moon } from './common.js';
import { pairs } from '../../utilities/array.js';
import { lcm } from '../../utilities/math.js';

export function part2({ lines }) {
  const moons = [];

  lines.forEach((line) => {
    const position = line.match(/-?\d+/g).map((n) => Number(n));
    moons.push(new Moon(position));
  });

  function getKeys() {
    const keys = moons.map((moon) => moon.keys());

    return [0, 1, 2].map((i) =>
      keys.reduce((result, moonKeys) => [...result, moonKeys[i]], []).join('#')
    );
  }

  const cache = {};
  const cycles = new Map();

  let steps = 0;

  while (cycles.size < 3) {
    let keys = getKeys();

    keys.forEach((key, i) => {
      if (cache[key] && !cycles.has(i)) {
        cycles.set(i, steps);
      } else {
        cache[key] = 1;
      }
    });

    for (const [moon1, moon2] of pairs(moons)) {
      moon1.applyGravity(moon2);
    }

    for (const moon of moons) {
      moon.applyVelocity();
    }

    steps++;
  }

  return lcm(...cycles.values());
}
