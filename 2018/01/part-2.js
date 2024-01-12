export function part2({ lines }) {
  const seen = {};
  let result;
  let frequency = 0;
  let index = 0;

  while (true) {
    frequency += Number(lines[index]);

    if (seen[frequency]) {
      result = frequency;
      break;
    }

    seen[frequency] = 1;

    index++;

    if (index >= lines.length) {
      index = 0;
    }
  }

  return result;
}
