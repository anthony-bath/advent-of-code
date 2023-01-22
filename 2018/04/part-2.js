import { read, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2018, 4, 2];

const entries = [];

read(YEAR, DAY, PART).forEach((line) => {
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

write(YEAR, DAY, PART, best.id * best.minute);
