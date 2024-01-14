export function part1({ data }) {
  const [start, end] = data.split('-').map(Number);

  const dups = /(\d)\1/;
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
