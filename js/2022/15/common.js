export function filterAndSortRanges(ranges) {
  return ranges
    .sort((a, b) => a.start - b.start)
    .filter((range, index) => {
      if (index === 0) return range;

      return range.end > ranges[index - 1].end;
    });
}

export function findMissingWithinRanges(ranges) {
  let currentEnd = 0;
  let result = null;

  for (const range of ranges) {
    if (currentEnd === 0) {
      currentEnd = range.end;
      continue;
    }

    if (range.end <= currentEnd) {
      continue;
    }

    if ((range.start <= currentEnd && range.end > currentEnd) || range.start - currentEnd === 1) {
      currentEnd = range.end;
    }

    if (range.start - currentEnd > 1) {
      result = currentEnd + 1;
      break;
    }
  }

  return result;
}

const { abs } = Math;

export class Sensor {
  constructor(x, y, bx, by) {
    this.x = x;
    this.y = y;
    this.range = abs(x - bx) + abs(y - by);
    this.top = y - this.range;
    this.bottom = y + this.range;
    this.left = x - this.range;
    this.right = x + this.range;
  }
}
