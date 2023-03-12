import { read, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2016, 11, 1];

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

function updateQueueIfSafe(nextData, currentFloor, nextFloor, nextSteps, queue, visited) {
  if (isSafe(nextData[currentFloor]) && isSafe(nextData[nextFloor])) {
    const nextKey = `${nextFloor}|${JSON.stringify(nextData)}`;

    if (!visited[nextKey]) {
      visited[nextKey] = 1;
      queue.push({ floor: nextFloor, data: nextData, steps: nextSteps });
    }
  }
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

  const { floor, steps } = current;

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

        updateQueueIfSafe(nextDataUp, floor, floor + 1, steps + 1, queue, visited);
      }

      if (floor > 0) {
        // can go down
        const nextDataDown = current.data.map((f) => [...f]);
        nextDataDown[floor][0] ^= material;
        nextDataDown[floor][1] ^= material;
        nextDataDown[floor - 1][0] |= material;
        nextDataDown[floor - 1][1] |= material;

        updateQueueIfSafe(nextDataDown, floor, floor - 1, steps + 1, queue, visited);
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
            nextDataUp[floor][1] ^= material | material2;
            nextDataUp[floor + 1][1] |= material | material2;

            updateQueueIfSafe(nextDataUp, floor, floor + 1, steps + 1, queue, visited);
          }

          if (floor > 0) {
            // can go down
            const nextDataDown = current.data.map((f) => [...f]);
            nextDataDown[floor][1] ^= material | material2;
            nextDataDown[floor - 1][1] |= material | material2;

            updateQueueIfSafe(nextDataDown, floor, floor - 1, steps + 1, queue, visited);
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
            nextDataUp[floor][0] ^= material | material2;
            nextDataUp[floor + 1][0] |= material | material2;

            updateQueueIfSafe(nextDataUp, floor, floor + 1, steps + 1, queue, visited);
          }

          if (floor > 0) {
            // can go down
            const nextDataDown = current.data.map((f) => [...f]);
            nextDataDown[floor][0] ^= material | material2;
            nextDataDown[floor - 1][0] |= material | material2;

            updateQueueIfSafe(nextDataDown, floor, floor - 1, steps + 1, queue, visited);
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

        updateQueueIfSafe(nextDataUp, floor, floor + 1, steps + 1, queue, visited);
      }

      if (floor > 0) {
        // can go down
        const nextDataDown = current.data.map((f) => [...f]);
        nextDataDown[floor][1] ^= material;
        nextDataDown[floor - 1][1] |= material;

        updateQueueIfSafe(nextDataDown, floor, floor - 1, steps + 1, queue, visited);
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

        updateQueueIfSafe(nextDataUp, floor, floor + 1, steps + 1, queue, visited);
      }

      if (floor > 0) {
        // can go down
        const nextDataDown = current.data.map((f) => [...f]);
        nextDataDown[floor][0] ^= material;
        nextDataDown[floor - 1][0] |= material;

        updateQueueIfSafe(nextDataDown, floor, floor - 1, steps + 1, queue, visited);
      }
    }
  }
}

write(YEAR, DAY, PART, result);
