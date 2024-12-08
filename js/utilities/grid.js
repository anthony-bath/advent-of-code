import { EOL } from 'os';

export function printTextGrid(grid, lightPixel) {
  return grid
    .map((row) => row.map((cell) => (cell === lightPixel ? '⬜' : '⬛')).join(''))
    .join(EOL);
}

export function printGrid(grid) {
  return grid.map((row) => row.join('')).join(EOL);
}
