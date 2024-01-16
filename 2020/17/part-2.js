export function part2({ lines }) {
  const actives = new Set();

  lines.forEach((line, y) => {
    line.split('').forEach((cubeState, x) => {
      if (cubeState === '#') {
        actives.add(`${x}|${y}|0|0`);
      }
    });
  });

  const neighborDeltas = [];

  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      for (let z = -1; z <= 1; z++) {
        for (let w = -1; w <= 1; w++) {
          if (x === 0 && y === 0 && z === 0 && w === 0) continue;
          neighborDeltas.push([x, y, z, w]);
        }
      }
    }
  }

  function getNeighborKeys(key) {
    const [x, y, z, w] = key.split('|').map((n) => Number(n));
    return neighborDeltas.map(([xd, yd, zd, wd]) => `${x + xd}|${y + yd}|${z + zd}|${w + wd}`);
  }

  const CYCLES = 6;

  const neighorsByKey = new Map();

  for (let cycle = 0; cycle < CYCLES; cycle++) {
    let queue = new Set();

    // need to consider all active cubes and all their neighbors
    // as no other inactive cubes could possibly be activated unless
    // they are a neighbor to a currently active cube
    for (const cubeKey of actives) {
      queue.add(cubeKey);

      if (!neighorsByKey.has(cubeKey)) {
        const neighbors = getNeighborKeys(cubeKey);
        neighorsByKey.set(cubeKey, neighbors);
      }

      for (const key of neighorsByKey.get(cubeKey)) {
        queue.add(key);
      }
    }

    const toActivate = new Set();
    const toDeactivate = new Set();

    for (const cubeKey of queue) {
      if (!neighorsByKey.has(cubeKey)) {
        neighorsByKey.set(cubeKey, getNeighborKeys(cubeKey));
      }

      const neighbors = neighorsByKey.get(cubeKey);

      let activeNeighborCount = 0;
      for (const neighbor of neighbors) {
        if (actives.has(neighbor)) activeNeighborCount++;

        if (activeNeighborCount === 4) break;
      }

      const isActive = actives.has(cubeKey);

      if (isActive && ![2, 3].includes(activeNeighborCount)) {
        toDeactivate.add(cubeKey);
      } else if (!isActive && activeNeighborCount === 3) {
        toActivate.add(cubeKey);
      }
    }

    for (const cubeKey of toDeactivate) {
      actives.delete(cubeKey);
    }

    for (const cubeKey of toActivate) {
      actives.add(cubeKey);
    }
  }

  return actives.size;
}
