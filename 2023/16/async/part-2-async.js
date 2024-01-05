import { readOld, write } from '../../../utilities/io.js';
import { Worker } from 'node:worker_threads';

const [YEAR, DAY, PART] = [2023, 16, 1];

const grid = readOld(YEAR, DAY, PART).map((line) => line.split(''));

const W = grid[0].length;
const H = grid.length;

const DIR = {
  LEFT: 0,
  UP: 1,
  RIGHT: 2,
  DOWN: 3,
};

const allOptions = [[], [], [], [], [], [], [], []];

let mid = Math.floor(W / 2);

for (let x = 0; x < mid; x++) {
  allOptions[0].push({ x, y: H - 1, dir: DIR.UP });
  allOptions[1].push({ x, y: 0, dir: DIR.DOWN });
}

for (let x = mid + 1; x < W; x++) {
  allOptions[2].push({ x, y: H - 1, dir: DIR.UP });
  allOptions[3].push({ x, y: 0, dir: DIR.DOWN });
}

mid = Math.floor(H / 2);

for (let y = 0; y < mid; y++) {
  allOptions[4].push({ x: 0, y, dir: DIR.RIGHT });
  allOptions[5].push({ x: W - 1, y, dir: DIR.LEFT });
}

for (let y = mid + 1; y < H; y++) {
  allOptions[6].push({ x: 0, y, dir: DIR.RIGHT });
  allOptions[7].push({ x: W - 1, y, dir: DIR.LEFT });
}

const workers = allOptions.map(
  (options) =>
    new Promise((resolve) => {
      const worker = new Worker('./2023/16/async/worker.js', {
        workerData: {
          options,
          grid,
        },
      });

      worker.on('message', resolve);
    })
);

const results = await Promise.all(workers);

write(YEAR, DAY, PART, Math.max(...results));
