import { read, write } from '../../utilities/io.js';
import { manhattan } from '../../utilities/math.js';

const [YEAR, DAY, PART] = [2021, 23, 1];

const amphipods = [];

read(YEAR, DAY, PART, { test: false }).forEach((line, y) => {
  const row = line.split('');

  for (let x = 0; x < 13; x++) {
    if (!row[x] || row[x] === ' ') {
      row[x] = '#';
      continue;
    }

    if (/[ABCD]/.test(row[x])) {
      amphipods.push({ x, y, type: row[x].charCodeAt(0) - 65 });
    }
  }
});

function isComplete(amphipods) {
  // return amphipods.every((a) => a.homed);
  for (const amphipod of amphipods) {
    const { x, y, type } = amphipod;
    const targetX = 3 + 2 * type;

    if (y === 1) return false;
    if (x !== targetX) return false;
  }

  return true;
}

const HALLWAY_X_POSITIONS = [1, 2, 4, 6, 8, 10, 11];

const stack = [{ spent: 0, amphipods: amphipods.map((a) => ({ ...a })) }];
const visited = {};
let min = Infinity;

while (stack.length) {
  const current = stack.pop();
  const key = JSON.stringify(current.amphipods);

  if (key in visited) {
    if (current.spent < visited[key]) {
      visited[key] = current.spent;
    } else {
      continue;
    }
  } else {
    visited[key] = current.spent;
  }

  if (isComplete(current.amphipods)) {
    min = Math.min(min, current.spent);
    continue;
  }

  for (const amphipod of current.amphipods) {
    const { type, x, y, homed } = amphipod;

    if (homed) continue;

    const targetX = 3 + 2 * type;

    if (y === 1) {
      // In the hallway; can only move to target room

      // First check if not blocked to getting to target room
      if (
        current.amphipods.some(
          (a) => a !== amphipod && ((a.x > x && a.x < targetX) || (a.x < x && a.x > targetX))
        )
      ) {
        // Blocked from moving to target room
        continue;
      }

      // Is target room empty or have only same type in there?
      const inRoom = current.amphipods.filter((a) => a.x === targetX);

      if (inRoom.length === 0) {
        // can move to bottom of room
        const cost = Math.pow(10, type) * manhattan({ x, y }, { x: targetX, y: 3 });
        const nextAmphipods = [
          ...current.amphipods.filter((a) => a !== amphipod).map((a) => ({ ...a })),
          { type, x: targetX, y: 3, homed: true },
        ];

        stack.push({ spent: current.spent + cost, amphipods: nextAmphipods });
      } else if (inRoom.length === 1 && inRoom[0].type === type) {
        // can move to top of room
        const cost = Math.pow(10, type) * manhattan({ x, y }, { x: targetX, y: 2 });
        const nextAmphipods = [
          ...current.amphipods.filter((a) => a !== amphipod).map((a) => ({ ...a })),
          { type, x: targetX, y: 2, homed: true },
        ];

        stack.push({ spent: current.spent + cost, amphipods: nextAmphipods });
      } else {
        // can't move into room as it's not empty or occupied by other types
        continue;
      }
    } else {
      // In a room, will attempt to move to hall OR target room if available

      // First check if not blocked to getting out
      if (y == 3 && current.amphipods.some((a) => a.x === x && a.y === 2)) {
        // can't get out at all
        continue;
      }

      // Try to move to own room first
      // Is target room empty or have only same type in there?
      const inRoom = current.amphipods.filter((a) => a.x === targetX);

      if (inRoom.length === 0) {
        // can move to bottom of room
        const cost = Math.pow(10, type) * (y - 1 + manhattan({ x, y: 1 }, { x: targetX, y: 3 }));
        const nextAmphipods = [
          ...current.amphipods.filter((a) => a !== amphipod).map((a) => ({ ...a })),
          { type, x: targetX, y: 3, homed: true },
        ];

        stack.push({ spent: current.spent + cost, amphipods: nextAmphipods });
      } else if (inRoom.length === 1 && inRoom[0].type === type) {
        // can move to top of room
        const cost = Math.pow(10, type) * (y - 1 + manhattan({ x, y: 1 }, { x: targetX, y: 2 }));
        const nextAmphipods = [
          ...current.amphipods.filter((a) => a !== amphipod).map((a) => ({ ...a })),
          { type, x: targetX, y: 2, homed: true },
        ];

        stack.push({ spent: current.spent + cost, amphipods: nextAmphipods });
      } else {
        // can't move into room as it's not empty or occupied by other types so try move into hallway instead
        for (const hallwayX of HALLWAY_X_POSITIONS) {
          if (
            current.amphipods.some(
              (a) => a !== amphipod && ((a.x > x && a.x < hallwayX) || (a.x < x && a.x > hallwayX))
            )
          ) {
            // Blocked from moving to given hallway x
            continue;
          }

          if (current.amphipods.some((a) => a.x === hallwayX && a.y === 1)) {
            continue;
          }

          const cost = Math.pow(10, type) * manhattan({ x, y }, { x: hallwayX, y: 1 });
          const nextAmphipods = [
            ...current.amphipods.filter((a) => a !== amphipod).map((a) => ({ ...a })),
            { type, x: hallwayX, y: 1 },
          ];

          stack.push({ spent: current.spent + cost, amphipods: nextAmphipods });
        }
      }
    }
  }
}

write(YEAR, DAY, PART, min);

//18203 - Too High
//16201 - Too High
//12089 - Too Low
