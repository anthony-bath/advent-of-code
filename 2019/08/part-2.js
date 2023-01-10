import { read, write } from '../../utility.js';

const [YEAR, DAY, PART] = [2019, 8, 2];

const WIDTH = 25;
const HEIGHT = 6;

const data = read(YEAR, DAY, { splitBy: '' });
const imageData = [];

let layer = [];

while (data.length) {
  const row = data.splice(0, WIDTH);
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

const result = image
  .map((row) => row.map((pixel) => (pixel === '1' ? '⬛' : '⬜')).join(''))
  .join('\n');

write(YEAR, DAY, PART, result);
