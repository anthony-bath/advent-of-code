import { read, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2016, 7, 1];

const pattern = /([a-z])((?!\1).)\2\1/g;
let count = 0;

read(YEAR, DAY, PART).forEach((line) => {
  const pairs = [];
  const stack = [];

  for (let i = 0; i < line.length; i++) {
    if (line[i] === '[') stack.push(i);
    else if (line[i] === ']') {
      pairs.push({ start: stack.pop(), end: i });
    }
  }

  const matches = line.match(pattern);

  if (matches) {
    for (const match of matches) {
      const index = line.indexOf(match);

      if (pairs.some((pair) => index >= pair.start && index <= pair.end)) {
        return;
      }
    }

    count++;
  }
});

write(YEAR, DAY, PART, count);
