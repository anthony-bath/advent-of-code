import { read, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2017, 21, 1];

function rotate(data) {
  return data[0].map((_, index) => [...data.map((row) => row[index])].reverse());
}

function flip(data) {
  return data.map((row) => row.reverse());
}

function flatten(data) {
  return data.map((row) => row.join('')).join('/');
}

const rules = new Map();

read(YEAR, DAY, PART).forEach((line) => {
  const [input, output] = line.split(' => ');
  const inputData = input.split('/').map((row) => row.split(''));
  const outputData = output.split('/').map((row) => row.split(''));

  rules.set(input, outputData);

  if (input.includes('#')) {
    let data = inputData;

    for (let rotations = 0; rotations < 3; rotations++) {
      data = rotate(data);
      rules.set(flatten(data), outputData);
    }

    data = flip(data);

    for (let rotations = 0; rotations < 3; rotations++) {
      data = rotate(data);
      rules.set(flatten(data), outputData);
    }
  }
});

let size = 3;

let grid = [
  ['.', '#', '.'],
  ['.', '.', '#'],
  ['#', '#', '#'],
];

for (let iterations = 0; iterations < 5; iterations++) {
  if (size % 2 === 0) {
    let parts = size / 2;

    for (let i = 0; i < parts; i++) {}
  }
}

write(YEAR, DAY, PART, '');
