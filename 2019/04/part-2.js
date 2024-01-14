export function part2({ data }) {
  const [start, end] = data.split('-').map(Number);

  // Negative Lookbehind & Negative Lookhead
  // Only matches adjacent numbers if the number immediately before or after is not the same
  const expr = [...Array(10).keys()].map((n) => `(?<!${n})${n}${n}(?!${n})`).join('|');
  const dups = new RegExp(`(${expr})`);

  const neverDecreases = (number) => {
    const digits = number.split('').map(Number);

    for (const [i, digit] of digits.entries()) {
      if (i === 0) continue;
      if (digits[i - 1] > digit) return false;
    }

    return true;
  };

  let count = 0;

  for (let password = start; password <= end; password++) {
    const str = password.toString();

    if (dups.test(str) && neverDecreases(str)) {
      count++;
    }
  }

  return count;
}
