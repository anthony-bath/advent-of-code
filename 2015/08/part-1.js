export function part1(data) {
  let result = 0;

  data.split('\n').forEach((line) => {
    const initial = line.length;
    line = line.substring(1, line.length - 1);

    const matches = line.match(/(\\.?x[0-9a-f]{2})/g);

    if (matches) {
      for (const match of matches) {
        const code = match.slice(-2);
        line = line.replace(match, String.fromCharCode(parseInt(code, 16)));
      }
    }

    line = line.replace(/\\"/g, '"');
    line = line.replace(/\\\\/g, '\\');

    const final = line.length;

    result += initial - final;
  });

  return result;
}
