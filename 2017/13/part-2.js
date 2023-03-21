import { read, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2017, 13, 1];

const layers = new Map();
let MAX_LAYER = -Infinity;

read(YEAR, DAY, PART).forEach((line) => {
  const [layer, depth] = line.split(': ').map((n) => Number(n));
  layers.set(layer, depth);

  if (layer > MAX_LAYER) {
    MAX_LAYER = layer;
  }
});

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

write(YEAR, DAY, PART, delay);
