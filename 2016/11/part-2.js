import { readOld, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2016, 11, 1];

const input = readOld(YEAR, DAY, PART);

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

function updateQueueIfSafe(nextData, currentFloor, nextFloor, nextSteps, queue, visited) {
  if (isSafe(nextData[currentFloor]) && isSafe(nextData[nextFloor])) {
    const nextKey = `${nextFloor}|${JSON.stringify(nextData)}`;

    if (!visited[nextKey]) {
      visited[nextKey] = 1;
      queue.push({ floor: nextFloor, data: nextData, steps: nextSteps });
      return true;
    }
  }

  return false;
}

function emptyBelowCurrentFloor(data, currentFloor) {
  while (currentFloor >= 0) {
    if (data[currentFloor][0] !== 0 || data[currentFloor][1] !== 0) {
      return false;
    }

    currentFloor--;
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

  const { floor, steps } = current;

  for (const material of materials) {
    const hasGenerator = current.data[floor][0] & material;
    const hasMicrochip = current.data[floor][1] & material;

    if (!hasGenerator && !hasMicrochip) continue;

    let doubleMove = false;

    // ------------------------------------------------------------
    // Two Parts Up Moves
    // ------------------------------------------------------------
    if (floor < 3) {
      if (hasGenerator && hasMicrochip) {
        // can go up
        const nextDataUp = current.data.map((f) => [...f]);
        nextDataUp[floor][0] ^= material;
        nextDataUp[floor][1] ^= material;
        nextDataUp[floor + 1][0] |= material;
        nextDataUp[floor + 1][1] |= material;

        doubleMove ||= updateQueueIfSafe(nextDataUp, floor, floor + 1, steps + 1, queue, visited);
      }

      for (const material2 of materials) {
        const hasGenerator2 = current.data[floor][0] & material2;
        const hasMicrochip2 = current.data[floor][1] & material2;

        if (!hasGenerator2 && !hasMicrochip2) continue;

        if (hasMicrochip && hasMicrochip2) {
          const nextDataUp = current.data.map((f) => [...f]);
          nextDataUp[floor][1] ^= material | material2;
          nextDataUp[floor + 1][1] |= material | material2;

          doubleMove ||= updateQueueIfSafe(nextDataUp, floor, floor + 1, steps + 1, queue, visited);
        }

        if (hasGenerator && hasGenerator2) {
          const nextDataUp = current.data.map((f) => [...f]);
          nextDataUp[floor][0] ^= material | material2;
          nextDataUp[floor + 1][0] |= material | material2;

          doubleMove ||= updateQueueIfSafe(nextDataUp, floor, floor + 1, steps + 1, queue, visited);
        }
      }
    }

    // ------------------------------------------------------------
    // Single Microchip Moves
    // ------------------------------------------------------------
    if (hasMicrochip) {
      if (floor < 3 && !doubleMove) {
        // can go up
        const nextDataUp = current.data.map((f) => [...f]);
        nextDataUp[floor][1] ^= material;
        nextDataUp[floor + 1][1] |= material;

        updateQueueIfSafe(nextDataUp, floor, floor + 1, steps + 1, queue, visited);
      }

      if (floor > 0 && emptyBelowCurrentFloor(current.data, floor)) {
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
    if (hasGenerator) {
      if (floor < 3 && !doubleMove) {
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
