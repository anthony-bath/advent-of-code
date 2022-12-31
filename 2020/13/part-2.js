import { read, write } from '../../utility.js';

const [YEAR, DAY, PART] = [2020, 13, 2];

const [_, buses] = read(YEAR, DAY);
const offsets = [];

buses.split(',').forEach((bus, index) => {
  if (bus === 'x') return;
  offsets.push({ id: Number(bus), amount: index });
});

let timestamp = 0;
let step = 1;
let tracking = [offsets[0], offsets[1]];
let nextIndex = 2;
let result = false;

while (true) {
  result = tracking.every(({ id, amount }) => (timestamp + amount) % id === 0);

  if (result && tracking.length === offsets.length) {
    break;
  } else if (result) {
    step = tracking.reduce((product, bus) => product * bus.id, 1);
    tracking.push(offsets[nextIndex++]);
  }

  timestamp += step;
}

write(YEAR, DAY, PART, timestamp);
