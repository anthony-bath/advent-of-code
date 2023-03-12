import { read, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2016, 11, 2];

const input = read(YEAR, DAY, PART);

const expr = /(\w+ generator|\w+-compatible microchip)/g;
const data = [];
const valueByMaterial = new Map();

input.forEach((floor) => {
  const items = floor.match(expr) || [];

  let generators = 0;
  let microchips = 0;

  for (const item of items) {
    if (item.includes('generator')) {
      const material = item.split(' ')[0];

      if (!valueByMaterial.has(material)) {
        valueByMaterial.set(material, Math.pow(2, valueByMaterial.size));
      }

      generators |= valueByMaterial.get(material);
    } else {
      const material = item.split('-')[0];

      if (!valueByMaterial.has(material)) {
        valueByMaterial.set(material, Math.pow(2, valueByMaterial.size));
      }

      microchips |= valueByMaterial.get(material);
    }
  }

  data.push([generators, microchips]);
});

valueByMaterial.set('elerium', Math.pow(2, valueByMaterial.size));
valueByMaterial.set('dilithium', Math.pow(2, valueByMaterial.size));

data[0][0] |= valueByMaterial.get('elerium');
data[0][1] |= valueByMaterial.get('elerium');
data[0][0] |= valueByMaterial.get('dilithium');
data[0][1] |= valueByMaterial.get('dilithium');

const materials = [...valueByMaterial.values()];
const allMaterials = Math.pow(2, valueByMaterial.size) - 1;

function isSafe([generators, microchips]) {
  for (const material of materials) {
    if (generators && microchips & material && !(generators & material)) {
      return false;
    }
  }

  return true;
}

const visited = { [`0|${JSON.stringify(data)}`]: 1 };
const queue = [{ floor: 0, data: data.map((f) => [...f]), steps: 0 }];
let result = null;

while (queue.length) {
  const current = queue.shift();

  if (
    current.floor === 3 &&
    current.data[3][0] === allMaterials &&
    current.data[3][1] === allMaterials
  ) {
    result = current.steps;
    break;
  }

  const { floor } = current;

  for (const material of materials) {
    // ------------------------------------------------------------
    // Microchip + Generator Moves
    // ------------------------------------------------------------
    if (current.data[floor][0] & material && current.data[floor][1] & material) {
      if (floor < 3) {
        // can go up
        const nextDataUp = current.data.map((f) => [...f]);
        nextDataUp[floor][0] ^= material;
        nextDataUp[floor][1] ^= material;
        nextDataUp[floor + 1][0] |= material;
        nextDataUp[floor + 1][1] |= material;

        if (isSafe(nextDataUp[floor]) && isSafe(nextDataUp[floor + 1])) {
          const nextKey = `${floor + 1}|${JSON.stringify(nextDataUp)}`;

          if (!visited[nextKey]) {
            visited[nextKey] = 1;
            queue.push({ floor: floor + 1, data: nextDataUp, steps: current.steps + 1 });
          }
        }
      }

      if (floor > 0) {
        // can go down
        const nextDataDown = current.data.map((f) => [...f]);
        nextDataDown[floor][0] ^= material;
        nextDataDown[floor][1] ^= material;
        nextDataDown[floor - 1][0] |= material;
        nextDataDown[floor - 1][1] |= material;

        if (isSafe(nextDataDown[floor]) && isSafe(nextDataDown[floor - 1])) {
          const nextKey = `${floor - 1}|${JSON.stringify(nextDataDown)}`;

          if (!visited[nextKey]) {
            visited[nextKey] = 1;
            queue.push({ floor: floor - 1, data: nextDataDown, steps: current.steps + 1 });
          }
        }
      }
    }

    // ------------------------------------------------------------
    // Two Microchip Moves
    // ------------------------------------------------------------
    if (current.data[floor][1] & material) {
      for (const material2 of materials) {
        if (material2 === material) continue;

        if (current.data[floor][1] & material2) {
          if (floor < 3) {
            // can go up
            const nextDataUp = current.data.map((f) => [...f]);
            nextDataUp[floor][1] ^= material;
            nextDataUp[floor][1] ^= material2;
            nextDataUp[floor + 1][1] |= material;
            nextDataUp[floor + 1][1] |= material2;

            if (isSafe(nextDataUp[floor]) && isSafe(nextDataUp[floor + 1])) {
              const nextKey = `${floor + 1}|${JSON.stringify(nextDataUp)}`;

              if (!visited[nextKey]) {
                visited[nextKey] = 1;
                queue.push({
                  floor: floor + 1,
                  data: nextDataUp,
                  steps: current.steps + 1,
                });
              }
            }
          }

          if (floor > 0) {
            // can go down
            const nextDataDown = current.data.map((f) => [...f]);
            nextDataDown[floor][1] ^= material;
            nextDataDown[floor][1] ^= material2;
            nextDataDown[floor - 1][1] |= material;
            nextDataDown[floor - 1][1] |= material2;

            if (isSafe(nextDataDown[floor]) && isSafe(nextDataDown[floor - 1])) {
              const nextKey = `${floor - 1}|${JSON.stringify(nextDataDown)}`;

              if (!visited[nextKey]) {
                visited[nextKey] = 1;
                queue.push({
                  floor: floor - 1,
                  data: nextDataDown,
                  steps: current.steps + 1,
                });
              }
            }
          }
        }
      }
    }

    // ------------------------------------------------------------
    // Two Generator Moves
    // ------------------------------------------------------------
    if (current.data[floor][0] & material) {
      for (const material2 of materials) {
        if (material2 === material) continue;

        if (current.data[floor][0] & material2) {
          if (floor < 3) {
            // can go up
            const nextDataUp = current.data.map((f) => [...f]);
            nextDataUp[floor][0] ^= material;
            nextDataUp[floor][0] ^= material2;
            nextDataUp[floor + 1][0] |= material;
            nextDataUp[floor + 1][0] |= material2;

            if (isSafe(nextDataUp[floor]) && isSafe(nextDataUp[floor + 1])) {
              const nextKey = `${floor + 1}|${JSON.stringify(nextDataUp)}`;

              if (!visited[nextKey]) {
                visited[nextKey] = 1;
                queue.push({
                  floor: floor + 1,
                  data: nextDataUp,
                  steps: current.steps + 1,
                });
              }
            }
          }

          if (floor > 0) {
            // can go down
            const nextDataDown = current.data.map((f) => [...f]);
            nextDataDown[floor][0] ^= material;
            nextDataDown[floor][0] ^= material2;
            nextDataDown[floor - 1][0] |= material;
            nextDataDown[floor - 1][0] |= material2;

            if (isSafe(nextDataDown[floor]) && isSafe(nextDataDown[floor - 1])) {
              const nextKey = `${floor - 1}|${JSON.stringify(nextDataDown)}`;

              if (!visited[nextKey]) {
                visited[nextKey] = 1;
                queue.push({
                  floor: floor - 1,
                  data: nextDataDown,
                  steps: current.steps + 1,
                });
              }
            }
          }
        }
      }
    }

    // ------------------------------------------------------------
    // Single Microchip Moves
    // ------------------------------------------------------------
    if (current.data[floor][1] & material) {
      if (floor < 3) {
        // can go up
        const nextDataUp = current.data.map((f) => [...f]);
        nextDataUp[floor][1] ^= material;
        nextDataUp[floor + 1][1] |= material;

        if (isSafe(nextDataUp[floor]) && isSafe(nextDataUp[floor + 1])) {
          const nextKey = `${floor + 1}|${JSON.stringify(nextDataUp)}`;

          if (!visited[nextKey]) {
            visited[nextKey] = 1;
            queue.push({ floor: floor + 1, data: nextDataUp, steps: current.steps + 1 });
          }
        }
      }

      if (floor > 0) {
        // can go down
        const nextDataDown = current.data.map((f) => [...f]);
        nextDataDown[floor][1] ^= material;
        nextDataDown[floor - 1][1] |= material;

        if (isSafe(nextDataDown[floor]) && isSafe(nextDataDown[floor - 1])) {
          const nextKey = `${floor - 1}|${JSON.stringify(nextDataDown)}`;

          if (!visited[nextKey]) {
            visited[nextKey] = 1;
            queue.push({ floor: floor - 1, data: nextDataDown, steps: current.steps + 1 });
          }
        }
      }
    }

    // ------------------------------------------------------------
    // Single Generator Moves
    // ------------------------------------------------------------
    if (current.data[floor][0] & material) {
      if (floor < 3) {
        // can go up
        const nextDataUp = current.data.map((f) => [...f]);
        nextDataUp[floor][0] ^= material;
        nextDataUp[floor + 1][0] |= material;

        if (isSafe(nextDataUp[floor]) && isSafe(nextDataUp[floor + 1])) {
          const nextKey = `${floor + 1}|${JSON.stringify(nextDataUp)}`;

          if (!visited[nextKey]) {
            visited[nextKey] = 1;
            queue.push({ floor: floor + 1, data: nextDataUp, steps: current.steps + 1 });
          }
        }
      }

      if (floor > 0) {
        // can go down
        const nextDataDown = current.data.map((f) => [...f]);
        nextDataDown[floor][0] ^= material;
        nextDataDown[floor - 1][0] |= material;

        if (isSafe(nextDataDown[floor]) && isSafe(nextDataDown[floor - 1])) {
          const nextKey = `${floor - 1}|${JSON.stringify(nextDataDown)}`;

          if (!visited[nextKey]) {
            visited[nextKey] = 1;
            queue.push({ floor: floor - 1, data: nextDataDown, steps: current.steps + 1 });
          }
        }
      }
    }
  }
}

write(YEAR, DAY, PART, result);

// TODO: Come back and improve performance
