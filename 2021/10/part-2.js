import { readOld, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2021, 10, 2];

const lines = readOld(YEAR, DAY, PART).map((l) => l.trim().split(''));

const BRACKETS = new Map([
  ['(', ')'],
  ['[', ']'],
  ['<', '>'],
  ['{', '}'],
]);

const SCORE_MAP = { ')': 1, ']': 2, '}': 3, '>': 4 };

let scores = [];

for (const line of lines) {
  const stack = [];
  let invalid = false;

  for (const char of line) {
    if (BRACKETS.has(char)) {
      stack.push(char);
    } else {
      const expected = BRACKETS.get(stack.pop());

      if (char !== expected) {
        invalid = true;
        break;
      }
    }
  }

  if (!invalid) {
    let score = 0;

    while (stack.length) {
      score *= 5;
      score += SCORE_MAP[BRACKETS.get(stack.pop())];
    }

    scores.push(score);
  }
}

scores.sort((a, b) => a - b);

write(YEAR, DAY, PART, scores[Math.floor(scores.length / 2)]);
