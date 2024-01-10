export function part1({ data }) {
  const input = data.replaceAll(/(!.)/g, '').split('');

  let inGarbage = false;
  let depth = 0;
  let score = 0;

  for (const item of input) {
    if (item === '{' && !inGarbage) {
      depth++;
    } else if (item === '<' && !inGarbage) {
      inGarbage = true;
    } else if (item === '>' && inGarbage) {
      inGarbage = false;
    } else if (item === '}' && !inGarbage) {
      score += depth;
      depth--;
    }
  }

  return score;
}
