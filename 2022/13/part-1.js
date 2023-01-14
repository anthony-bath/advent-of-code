import { read, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2022, 13, 1];

function compare(left, right) {
  if (Number.isInteger(left) && Number.isInteger(right)) {
    if (left < right) {
      return 1;
    } else if (left === right) {
      return 0;
    } else {
      return -1;
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

    if (result === 1) {
      return 1;
    } else if (result === -1) {
      return -1;
    }
  }

  // if we got here, the comparisons have been all equality
  if (left.length < right.length) {
    return 1;
  } else if (right.length < left.length) {
    return -1;
  } else {
    return 0;
  }
}

const input = read(YEAR, DAY, PART);

const orderedIndices = [];
let pairNumber = 1;

for (let i = 0; i < input.length; i += 3) {
  const left = JSON.parse(input[i]);
  const right = JSON.parse(input[i + 1]);

  const result = compare(left, right);

  if (result === 1) {
    orderedIndices.push(pairNumber);
  }

  pairNumber++;
}

write(
  YEAR,
  DAY,
  PART,
  orderedIndices.reduce((sum, x) => sum + x, 0)
);
