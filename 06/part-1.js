import { read, write } from '../utility.js';

const input = read(6);

let total = 0;
let currentGroup = new Set();

for (let i = 0; i < input.length; i++) {
  const line = input[i];

  if (!line) {
    total += currentGroup.size;
    currentGroup = new Set();
  } else {
    line.split('').forEach((question) => currentGroup.add(question));

    if (i === input.length - 1) {
      total += currentGroup.size;
    }
  }
}

write(6, 1, total);
