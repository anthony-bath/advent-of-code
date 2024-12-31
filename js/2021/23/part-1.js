import { manhattan } from '../../utilities/math.js';

const { min, pow } = Math;

export function part1({ lines }) {
  const amphipods = [];

  lines.forEach((line, y) => {
    const row = line.split('');

    for (let x = 0; x < row.length; x++) {
      if (/[ABCD]/.test(row[x])) {
        const type = row[x].charCodeAt(0) - 65;
        const targetX = 3 + 2 * type;

        amphipods.push({ x, y, type, done: y === 3 && x === targetX });
      }
    }
  });

  function canMove(from, to, others) {
    if (from.y === 3 && others.some((a) => a.x === from.x && a.y === 2)) {
      return false;
    }

    if (others.some((a) => a.x === to.x && a.y === to.y)) {
      return false;
    }

    if (
      others.some(
        (a) => a.y === 1 && ((a.x > from.x && a.x < to.x) || (a.x < from.x && a.x > to.x))
      )
    ) {
      return false;
    }

    return true;
  }

  const HALLWAY_X_POSITIONS = [1, 2, 4, 6, 8, 10, 11];
  const visited = new Map();
  const stack = [{ spent: 0, amphipods }];
  let minCost = Infinity;

  while (stack.length) {
    const current = stack.pop();
    const key = current.amphipods.map((a) => `${a.x},${a.y},${a.type},${a.done}`).join('|');

    if (visited.has(key)) {
      if (current.spent < visited.get(key)) {
        visited.set(key, current.spent);
      } else {
        continue;
      }
    } else {
      visited.set(key, current.spent);
    }

    if (current.amphipods.every((a) => a.done)) {
      minCost = min(minCost, current.spent);
      continue;
    }

    if (current.spent > minCost) continue;

    for (const amphipod of current.amphipods) {
      if (amphipod.done) continue;

      const { x, y, type } = amphipod;
      const others = current.amphipods.filter((a) => a !== amphipod);
      const targetX = 3 + 2 * type;

      // Can this amphipod move into it's target room
      const othersInTargetRoom = others.filter((a) => a.x === targetX);

      if (othersInTargetRoom.length === 0) {
        // can move into the bottom of the room if able to
        const from = { x, y };
        const to = { x: targetX, y: 3 };

        if (canMove(from, to, others)) {
          const cost = pow(10, type) * (y - 1 + manhattan({ x: from.x, y: 1 }, to));
          const nextAmphipods = others.map((a) => ({ x: a.x, y: a.y, type: a.type, done: a.done }));
          nextAmphipods.push({ x: targetX, y: 3, type, done: true });

          stack.push({ spent: current.spent + cost, amphipods: nextAmphipods });
        }
      } else if (
        othersInTargetRoom.length === 1 &&
        othersInTargetRoom[0].type === type &&
        othersInTargetRoom[0].y === 3
      ) {
        // can move into the top of the room if able to
        const from = { x, y };
        const to = { x: targetX, y: 2 };

        if (canMove(from, to, others)) {
          const cost = pow(10, type) * (y - 1 + manhattan({ x: from.x, y: 1 }, to));
          const nextAmphipods = others.map((a) => ({ x: a.x, y: a.y, type: a.type, done: a.done }));
          nextAmphipods.push({ x: targetX, y: 2, type, done: true });

          stack.push({ spent: current.spent + cost, amphipods: nextAmphipods });
        }
      } else {
        // can't move into it's target room
        // if it's in a room, try and move into the hallway
        if (y !== 1) {
          const from = { x, y };

          for (const hallwayX of HALLWAY_X_POSITIONS) {
            const to = { x: hallwayX, y: 1 };

            if (canMove(from, to, others)) {
              const cost = pow(10, type) * manhattan(from, to);
              const nextAmphipods = others.map((a) => ({
                x: a.x,
                y: a.y,
                type: a.type,
                done: a.done,
              }));
              nextAmphipods.push({ x: to.x, y: to.y, type, done: false });

              stack.push({ spent: current.spent + cost, amphipods: nextAmphipods });
            }
          }
        }
      }
    }
  }

  return minCost;
}
