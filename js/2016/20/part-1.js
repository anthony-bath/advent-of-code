export function part1({ lines }) {
  const ranges = lines.map((line) => {
    const [start, end] = line.split('-').map((n) => Number(n));
    return { start, end };
  });

  ranges.sort((a, b) => a.start - b.start);

  let index = 1;
  while (true) {
    const prevEnd = ranges[index - 1].end;
    const currStart = ranges[index].start;

    if (currStart <= prevEnd || currStart === prevEnd + 1) {
      index++;
    } else {
      break;
    }
  }

  return ranges[index - 1].end + 1;
}
