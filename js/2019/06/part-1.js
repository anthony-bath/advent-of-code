export function part1({ lines }) {
  const directOrbitsByObject = new Map();

  lines.forEach((line) => {
    const [orbitee, orbiter] = line.split(')');
    directOrbitsByObject.set(orbiter, orbitee);
  });

  function getOrbits(object) {
    if (object === 'COM') {
      return 0;
    }

    return 1 + getOrbits(directOrbitsByObject.get(object));
  }

  return [...directOrbitsByObject.keys()].reduce((sum, object) => sum + getOrbits(object), 0);
}
