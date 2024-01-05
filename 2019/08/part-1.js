import { readOld, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2019, 8, 1];

const WIDTH = 25;
const HEIGHT = 6;

const layers = {};

readOld(YEAR, DAY, PART, { splitBy: '' }).forEach((pixel, i) => {
  const layer = Math.floor(i / (WIDTH * HEIGHT));

  if (!layers[layer]) {
    layers[layer] = [0, 0, 0];
  }

  layers[layer][Number(pixel)]++;
});

const [_, ones, twos] = Object.values(layers)
  .sort((a, b) => a[0] - b[0])
  .shift();

write(YEAR, DAY, PART, ones * twos);
