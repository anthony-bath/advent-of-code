import { getInputElements } from './common.js';

export function part2({ lines }) {
  const { layers, MAX_LAYER } = getInputElements(lines);

  let delay = 1;

  while (true) {
    let currentLayer = 0;
    let currentPicoSecond = delay;
    let caught = false;

    while (currentLayer <= MAX_LAYER) {
      const depth = layers.get(currentLayer);

      if (depth) {
        const atDepth0 = currentPicoSecond % (2 * (depth - 1)) === 0;

        if (atDepth0) {
          caught = true;
          break;
        }
      }

      currentLayer++;
      currentPicoSecond++;
    }

    if (!caught) {
      break;
    }

    delay++;
  }

  return delay;
}
