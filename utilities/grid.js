import { EOL } from 'os';

export function printGrid(grid, lightPixel) {
  return grid
    .map((row) => row.map((cell) => (cell === lightPixel ? '⬜' : '⬛')).join(''))
    .join(EOL);
}
