export function part2(data) {
  let result = 0;

  data.split('\n').forEach((line) => {
    const initial = line.length;

    line = line.replace(/\\/g, '\\\\');
    line = line.replace(/"/g, '\\"');

    const final = 2 + line.length;

    result += final - initial;
  });

  return result;
}
