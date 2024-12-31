export function part2({ lines }) {
  const digitMap = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
  };

  const expr = /(?=(\d|one|two|three|four|five|six|seven|eight|nine))/g;

  return lines.reduce((total, line) => {
    const digits = Array.from(line.matchAll(expr), (match) => match[1]);
    const first = digitMap[digits[0]];
    const last = digitMap[digits[digits.length - 1]];

    return total + Number(`${first}${last}`);
  }, 0);
}
