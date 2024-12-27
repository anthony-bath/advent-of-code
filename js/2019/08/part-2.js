import { printTextGrid } from '../../../utilities/grid.js';

export function part2({ data }) {
  const WIDTH = 25;
  const HEIGHT = 6;

  const rawData = data.split('');
  const imageData = [];

  let layer = [];

  while (rawData.length) {
    const row = rawData.splice(0, WIDTH);
    layer.push(row);

    if (layer.length === HEIGHT) {
      imageData.push(layer);
      layer = [];
    }
  }

  const image = [...Array(HEIGHT)].map((_) => Array(WIDTH));

  for (let row = 0; row < HEIGHT; row++) {
    for (let col = 0; col < WIDTH; col++) {
      let layer = 0;
      let pixel;

      do {
        pixel = imageData[layer][row][col];

        if (['0', '1'].includes(pixel)) {
          image[row][col] = pixel;
          break;
        } else {
          layer++;
        }
      } while (pixel === '2');
    }
  }

  return printTextGrid(image, '1');
}
