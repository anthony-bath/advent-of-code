import { getEntries } from './common.js';

export function part2({ lines }) {
  const entries = getEntries(lines);
  const rangesAsleepByGuard = {};

  let currentGuard = null;
  let currentRange = null;

  entries.forEach(({ id, minute }) => {
    if (id) {
      currentGuard = id;
      rangesAsleepByGuard[id] = rangesAsleepByGuard[id] ?? [];
      return;
    }

    if (currentRange === null) {
      currentRange = { start: minute };
    } else {
      currentRange.end = minute - 1;
      rangesAsleepByGuard[currentGuard].push({ ...currentRange });
      currentRange = null;
    }
  });

  const minuteAsleepByGuard = {};
  let best = null;

  for (let minute = 0; minute < 60; minute++) {
    minuteAsleepByGuard[minute] = {};

    for (const [id, ranges] of Object.entries(rangesAsleepByGuard)) {
      for (const { start, end } of ranges) {
        if (minute >= start && minute <= end) {
          if (!minuteAsleepByGuard[minute][id]) {
            minuteAsleepByGuard[minute][id] = 0;
          }

          minuteAsleepByGuard[minute][id]++;

          if (!best || minuteAsleepByGuard[minute][id] > best.count) {
            best = {
              id: Number(id),
              minute,
              count: minuteAsleepByGuard[minute][id],
            };
          }
        }
      }
    }
  }

  return best.id * best.minute;
}
