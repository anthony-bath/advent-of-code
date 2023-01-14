import { read, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2021, 10, 1];

const lines = read(YEAR, DAY, PART).map((l) => l.trim().split(''));

const BRACKETS = new Map([
  ['(', ')'],
  ['[', ']'],
  ['<', '>'],
  ['{', '}'],
]);

const SCORE_MAP = { ')': 3, ']': 57, '}': 1197, '>': 25137 };

let score = 0;

for (const line of lines) {
  const stack = [];

  for (const char of line) {
    if (BRACKETS.has(char)) {
      stack.push(char);
    } else {
      const expected = BRACKETS.get(stack.pop());

      if (char !== expected) {
        score += SCORE_MAP[char];
        break;
      }
    }
  }
}

write(YEAR, DAY, PART, score);
