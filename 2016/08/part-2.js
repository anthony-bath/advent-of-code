import { printGrid } from '../../utilities/grid.js';
import { read, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2016, 8, 2];

const WIDTH = 50;
const HEIGHT = 6;

const screen = [...Array(HEIGHT).keys()].map(() => Array(WIDTH).fill('⬛️'));

function rotate(array, distance) {
  return [...array.slice(-distance), ...array.slice(0, array.length - distance)];
}

read(YEAR, DAY, PART).forEach((line) => {
  const [a, b] = line.match(/\d+/g).map((n) => Number(n));

  if (line.startsWith('rect')) {
    for (let row = 0; row < b; row++) {
      for (let col = 0; col < a; col++) {
        screen[row][col] = '⬜️';
      }
    }
  } else if (line.startsWith('rotate row')) {
    screen[a] = rotate(screen[a], b);
  } else if (line.startsWith('rotate column')) {
    const column = rotate(
      screen.reduce((output, row) => [...output, row[a]], []),
      b
    );

    for (let row = 0; row < HEIGHT; row++) {
      screen[row][a] = column[row];
    }
  }
});

write(YEAR, DAY, PART, printGrid(screen));
