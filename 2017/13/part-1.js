import { getInputElements } from './common.js';

export function part1({ lines }) {
  const { layers, MAX_LAYER } = getInputElements(lines);

  let currentLayer = 0;
  let currentPicoSecond = 0;
  let severity = 0;

  while (currentLayer <= MAX_LAYER) {
    const depth = layers.get(currentLayer);

    if (depth) {
      const atDepth0 = currentPicoSecond % (2 * (depth - 1)) === 0;

      if (atDepth0) {
        severity += currentLayer * depth;
      }
    }

    currentLayer++;
    currentPicoSecond++;
  }

  return severity;
}

// Depth = 4    C   /4  %
// At  0 -> 0   *   0   0
// At  1 -> 1       0   1
// At  2 -> 2       0   2
// At  3 -> 3       0   3
// At  4 -> 2       1   0
// At  5 -> 1       1   1
// At  6 -> 0   *   1   2
// At  7 -> 1       1   3
// At  8 -> 2       2   0
// At  9 -> 3       2   1
// At 10 -> 2       2   2
// At 11 -> 1       2   3
// At 12 -> 0   *   3   0
// At 13 -> 1       3   1

// Every 2 * (depth-1) picoseconds the scanner is at depth 0 for a given depth
