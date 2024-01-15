export function part2({ lines }) {
  const numbers = lines.map(Number);

  function findTwoNumbersToSum(target, array) {
    for (const number of array) {
      if (array.includes(target - number)) {
        return [number, target - number];
      }
    }

    return [];
  }

  let result;

  for (const number of numbers) {
    const target = 2020 - number;
    const pair = findTwoNumbersToSum(target, numbers);

    if (pair.length) {
      result = number * pair[0] * pair[1];
      break;
    }
  }

  return result;
}
