export function part2({ lines }) {
  let result = 0;

  lines.forEach((line) => {
    const initial = line.length;

    line = line.replace(/\\/g, '\\\\');
    line = line.replace(/"/g, '\\"');

    const final = 2 + line.length;

    result += final - initial;
  });

  return result;
}
