import { read, write } from '../../utilities/io.js';
import { flatten, rotateGrid, getUpdatedGrid } from './common.js';

const [YEAR, DAY, PART] = [2017, 21, 2];

const rules = new Map();

read(YEAR, DAY, PART).forEach((line) => {
  const [input, output] = line.split(' => ');
  const inputData = input.split('/').map((row) => row.split(''));
  const outputData = output.split('/').map((row) => row.split(''));

  rules.set(input, outputData);

  if (input.includes('#')) {
    let data = inputData;
    const rotations = [];

    for (let i = 0; i < 4; i++) {
      rotations.push(data);
      data = rotateGrid(data);
    }

    data = data.map((row) => [...row].reverse());

    for (let i = 0; i < 4; i++) {
      rotations.push(data);
      data = rotateGrid(data);
    }

    rotations.forEach((rot) => rules.set(flatten(rot), outputData));
  }
});

let size = 3;

let grid = [
  ['.', '#', '.'],
  ['.', '.', '#'],
  ['#', '#', '#'],
];

const ITERATIONS = 18;

for (let iteration = 0; iteration < ITERATIONS; iteration++) {
  if (size % 2 === 0) {
    [grid, size] = getUpdatedGrid(size, grid, 2, 3, rules);
  } else {
    [grid, size] = getUpdatedGrid(size, grid, 3, 4, rules);
  }
}

let count = 0;

for (let row = 0; row < grid.length; row++) {
  for (let col = 0; col < grid[row].length; col++) {
    if (grid[row][col] === '#') {
      count++;
    }
  }
}

write(YEAR, DAY, PART, count);
