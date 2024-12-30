export function getCompare(order) {
  return function compare(left, right) {
    if (Number.isInteger(left) && Number.isInteger(right)) {
      if (left < right) {
        return -1 * order;
      } else if (left === right) {
        return 0;
      } else {
        return 1 * order;
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

      if (result === -1 * order) {
        return -1 * order;
      } else if (result === 1 * order) {
        return 1 * order;
      }
    }

    // if we got here, the comparisons have been all equality
    if (left.length < right.length) {
      return -1 * order;
    } else if (right.length < left.length) {
      return 1 * order;
    } else {
      return 0;
    }
  };
}
