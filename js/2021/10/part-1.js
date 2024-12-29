export function part1({ lines }) {
  const chunkLines = lines.map((l) => l.trim().split(''));

  const BRACKETS = new Map([
    ['(', ')'],
    ['[', ']'],
    ['<', '>'],
    ['{', '}'],
  ]);

  const SCORE_MAP = { ')': 3, ']': 57, '}': 1197, '>': 25137 };

  let score = 0;

  for (const line of chunkLines) {
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

  return score;
}
