import { getInputElements } from './common.js';

export function part1({ lines }) {
  let { xMax, yMax, coords, folds } = getInputElements(lines);
  let paper = [...Array(yMax + 1)].map((_) => Array(xMax + 1).fill('.'));

  coords.forEach(([x, y]) => {
    paper[y][x] = '#';
  });

  for (const [dir, point] of [folds[0]]) {
    let paperAfterFold;

    switch (dir) {
      case 'y':
        const yMaxNew = point - 1;

        paperAfterFold = [...Array(yMaxNew + 1)].map((_) => Array(xMax + 1).fill('.'));

        for (let i = 1; i < yMax - point + 1; i++) {
          let newY = point - i;
          let oldY = point + i;

          for (let x = 0; x < xMax + 1; x++) {
            paperAfterFold[newY][x] = paper[newY][x] === '#' || paper[oldY][x] === '#' ? '#' : '.';
          }
        }

        paper = paperAfterFold;
        yMax = yMaxNew;

        break;
      case 'x':
        const xMaxNew = point - 1;

        paperAfterFold = [...Array(yMax + 1)].map((_) => Array(xMaxNew + 1).fill('.'));

        for (let y = 0; y < yMax + 1; y++) {
          for (let i = 1; i < xMax - point + 1; i++) {
            let newX = point - i;
            let oldX = point + i;

            paperAfterFold[y][newX] = paper[y][newX] === '#' || paper[y][oldX] === '#' ? '#' : '.';
          }
        }

        paper = paperAfterFold;
        xMax = xMaxNew;

        break;
    }
  }

  return paper.reduce((count, row) => row.filter((c) => c === '#').length + count, 0);
}
