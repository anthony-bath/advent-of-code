import { readOld, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2018, 4, 1];

const entries = [];

readOld(YEAR, DAY, PART).forEach((line) => {
  const timestamp = line.substring(1, 17);
  const [, time] = timestamp.split(' ');
  const [, minute] = time.split(':').map((n) => Number(n));

  let id = null;

  const eventData = line.substring(19);

  if (eventData.includes('Guard')) {
    id = eventData.match(/\d+/g)[0];
  }

  entries.push({ time: new Date(timestamp), minute, id });
});

entries.sort((a, b) => a.time - b.time);

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

write(YEAR, DAY, PART, mostSleepingGuardId * best.minute);
