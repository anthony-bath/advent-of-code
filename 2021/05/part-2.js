import {
  getInputElements,
  plotHorizontal,
  plotVertical,
  plotDiagonal,
  evaluateGrid,
} from './common.js';

export function part2({ lines }) {
  const { lineData, grid } = getInputElements(lines);

  for (const line of lineData) {
    const { x1, x2, y1, y2 } = line;

    if (x1 === x2) {
      plotVertical(y1, y2, x1, grid);
    } else if (y1 === y2) {
      plotHorizontal(x1, x2, y1, grid);
    } else {
      plotDiagonal(x1, x2, y1, y2, grid);
    }
  }

  return evaluateGrid(grid);
}
