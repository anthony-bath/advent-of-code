import { read, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2019, 6, 1];

const directOrbitsByObject = new Map();

read(YEAR, DAY, PART).forEach((line) => {
  const [orbitee, orbiter] = line.split(')');
  directOrbitsByObject.set(orbiter, orbitee);
});

function getOrbits(object) {
  if (object === 'COM') {
    return 0;
  }

  return 1 + getOrbits(directOrbitsByObject.get(object));
}

write(
  YEAR,
  DAY,
  PART,
  [...directOrbitsByObject.keys()].reduce((sum, object) => sum + getOrbits(object), 0)
);
