export function part1({ lines }) {
  const numbers = lines.map(Number);

  let result;

  for (const number of numbers) {
    if (numbers.includes(2020 - number)) {
      result = number * (2020 - number);
      break;
    }
  }

  return result;
}
