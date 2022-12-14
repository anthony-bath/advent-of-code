import { read, write } from '../utility.js';

function compare(left, right) {
  if (Number.isInteger(left) && Number.isInteger(right)) {
    if (left < right) {
      return -1;
    } else if (left === right) {
      return 0;
    } else {
      return 1;
    }
  }

  if (Array.isArray(left) && Number.isInteger(right)) {
    return compare(left, [right]);
  }

  if (Number.isInteger(left) && Array.isArray(right)) {
    return compare([left], right);
  }

  // both Arrays
  for (let i = 0; i < Math.min(left.length, right.length); i++) {
    const result = compare(left[i], right[i]);

    if (result === -1) {
      return -1;
    } else if (result === 1) {
      return 1;
    }
  }

  // if we got here, the comparisons have been all equality
  if (left.length < right.length) {
    return -1;
  } else if (right.length < left.length) {
    return 1;
  } else {
    return 0;
  }
}

const input = read(13);
const markers = [[[2]], [[6]]];
const packets = [...markers];

for (const line of input) {
  if (!line) continue;
  packets.push(JSON.parse(line));
}

packets.sort(compare);

write(13, 2, `${(1 + packets.indexOf(markers[0])) * (1 + packets.indexOf(markers[1]))}`);
