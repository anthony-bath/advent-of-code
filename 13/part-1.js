import { read } from '../utility.js';

function compare(left, right) {
  console.log(`comparing ${JSON.stringify(left)} to ${JSON.stringify(right)}`);

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
  if (left.length === right.length) {
    const result = left.map((_, i) => compare(left[i], right[i]));

    if (result.every((x) => x === 1)) {
      return 1;
    } else if (result.indexOf(-1) !== -1) {
      return -1;
    } else {
      if (result.every((x) => x === 1 || x === 0)) {
        return 0;
      } else {
        return -1;
      }
    }
  } else {
    let lastResult;
    for (let i = 0; i < Math.min(left.length, right.length); i++) {
      const result = compare(left[i], right[i]);

      if (result === -1) {
        return -1;
      }

      if (i === Math.min(left.length, right.length) - 1) {
        lastResult = result;
      }
    }

    if (lastResult === 1) {
      return 1;
    }

    // if we got here, the comparisons have been less than or equal so
    // need to fall back to the length. If right has run out of items,
    // packets are not ordered. If left has run out of items, packets
    //are ordered
    if (left.length < right.length) {
      return 1;
    } else {
      return -1;
    }
  }
}

const input = read(13);

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

console.log(orderedIndices.reduce((sum, x) => sum + x, 0));
