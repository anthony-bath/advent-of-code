export function part2({ data }) {
  const input = data.replaceAll(/(!.)/g, '').split('');

  let inGarbage = false;
  let count = 0;

  for (const item of input) {
    if (inGarbage && item !== '>') {
      count++;
      continue;
    }

    if (item === '<') {
      inGarbage = true;
      continue;
    }

    if (item === '>') {
      inGarbage = false;
    }
  }

  return count;
}
