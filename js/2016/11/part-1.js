import { getData, updateQueueIfSafe, emptyBelowCurrentFloor } from './common.js';

export function part1({ lines }) {
  const { data, valueByMaterial } = getData(lines);
  const materials = [...valueByMaterial.values()];
  const allMaterials = Math.pow(2, valueByMaterial.size) - 1;

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

          doubleMove ||= updateQueueIfSafe(
            nextDataUp,
            floor,
            floor + 1,
            steps + 1,
            queue,
            visited,
            materials
          );
        }

        for (const material2 of materials) {
          const hasGenerator2 = current.data[floor][0] & material2;
          const hasMicrochip2 = current.data[floor][1] & material2;

          if (!hasGenerator2 && !hasMicrochip2) continue;

          if (hasMicrochip && hasMicrochip2) {
            const nextDataUp = current.data.map((f) => [...f]);
            nextDataUp[floor][1] ^= material | material2;
            nextDataUp[floor + 1][1] |= material | material2;

            doubleMove ||= updateQueueIfSafe(
              nextDataUp,
              floor,
              floor + 1,
              steps + 1,
              queue,
              visited,
              materials
            );
          }

          if (hasGenerator && hasGenerator2) {
            const nextDataUp = current.data.map((f) => [...f]);
            nextDataUp[floor][0] ^= material | material2;
            nextDataUp[floor + 1][0] |= material | material2;

            doubleMove ||= updateQueueIfSafe(
              nextDataUp,
              floor,
              floor + 1,
              steps + 1,
              queue,
              visited,
              materials
            );
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

          updateQueueIfSafe(nextDataUp, floor, floor + 1, steps + 1, queue, visited, materials);
        }

        if (floor > 0 && emptyBelowCurrentFloor(current.data, floor)) {
          // can go down
          const nextDataDown = current.data.map((f) => [...f]);
          nextDataDown[floor][1] ^= material;
          nextDataDown[floor - 1][1] |= material;

          updateQueueIfSafe(nextDataDown, floor, floor - 1, steps + 1, queue, visited, materials);
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

          updateQueueIfSafe(nextDataUp, floor, floor + 1, steps + 1, queue, visited, materials);
        }

        if (floor > 0) {
          // can go down
          const nextDataDown = current.data.map((f) => [...f]);
          nextDataDown[floor][0] ^= material;
          nextDataDown[floor - 1][0] |= material;

          updateQueueIfSafe(nextDataDown, floor, floor - 1, steps + 1, queue, visited, materials);
        }
      }
    }
  }

  return result;
}
