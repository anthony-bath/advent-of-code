import { write } from '../../utilities/io.js';
import { loadData, plotHorizontal, plotVertical, evaluateGrid } from './common.js';

const [YEAR, DAY, PART] = [2021, 5, 1];

const { lines, grid } = loadData(PART);

for (const line of lines) {
  const { x1, x2, y1, y2 } = line;

  if (x1 === x2) {
    plotVertical(y1, y2, x1, grid);
  } else if (y1 === y2) {
    plotHorizontal(x1, x2, y1, grid);
  }
}

write(YEAR, DAY, PART, evaluateGrid(grid));
