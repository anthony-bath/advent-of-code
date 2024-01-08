export function part1({ lines }) {
  const pattern = /([a-z])((?!\1).)\2\1/g;

  return lines.reduce((count, line) => {
    const pairs = [];
    const stack = [];

    for (let i = 0; i < line.length; i++) {
      if (line[i] === '[') stack.push(i);
      else if (line[i] === ']') {
        pairs.push({ start: stack.pop(), end: i });
      }
    }

    const matches = line.match(pattern);

    if (!matches) return count;

    for (const match of matches) {
      const index = line.indexOf(match);

      if (pairs.some((pair) => index >= pair.start && index <= pair.end)) {
        return count;
      }
    }

    return count + 1;
  }, 0);
}
