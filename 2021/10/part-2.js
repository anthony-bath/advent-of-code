export function part2({ lines }) {
  const chunkLines = lines.map((l) => l.trim().split(''));

  const BRACKETS = new Map([
    ['(', ')'],
    ['[', ']'],
    ['<', '>'],
    ['{', '}'],
  ]);

  const SCORE_MAP = { ')': 1, ']': 2, '}': 3, '>': 4 };

  let scores = [];

  for (const line of chunkLines) {
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

  return scores[Math.floor(scores.length / 2)];
}
