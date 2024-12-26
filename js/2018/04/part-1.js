import { getEntries } from './common.js';

export function part1({ lines }) {
  const entries = getEntries(lines);
  const rangesAsleepByGuard = {};
  const minutesAsleepByGuard = {};

  let currentGuard = null;
  let currentRange = null;

  entries.forEach(({ id, minute }) => {
    if (id) {
      currentGuard = id;
      rangesAsleepByGuard[id] ??= [];
      minutesAsleepByGuard[id] ??= 0;
      return;
    }

    if (currentRange === null) {
      currentRange = { start: minute };
    } else {
      currentRange.end = minute - 1;
      rangesAsleepByGuard[currentGuard].push({ ...currentRange });
      minutesAsleepByGuard[currentGuard] += currentRange.end - currentRange.start + 1;
      currentRange = null;
    }
  });

  const mostSleepingGuardId = Number(
    Object.entries(minutesAsleepByGuard)
      .sort((a, b) => b[1] - a[1])
      .shift()[0]
  );

  let best = { minute: null, count: 0 };

  for (let minute = 0; minute < 60; minute++) {
    let count = 0;

    for (const { start, end } of rangesAsleepByGuard[mostSleepingGuardId]) {
      if (minute >= start && minute <= end) {
        count++;
      }
    }

    if (count > best.count) {
      best = { count, minute };
    }
  }

  return mostSleepingGuardId * best.minute;
}
