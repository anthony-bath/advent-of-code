import { DIR, evaluate } from './common.js';

export function part2({ grid }) {
  const W = grid[0].length;
  const H = grid.length;

  const options = [];

  for (let x = 0; x < W; x++) {
    options.push({ x, y: 0, dir: DIR.UP });
    options.push({ x, y: H - 1, dir: DIR.UP });
  }

  for (let y = 0; y < H; y++) {
    options.push({ x: 0, y, dir: DIR.RIGHT });
    options.push({ x: W - 1, y, dir: DIR.LEFT });
  }

  return evaluate(options, grid);
}
