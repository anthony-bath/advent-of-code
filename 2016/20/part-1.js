import { read, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2016, 20, 1];

const ranges = read(YEAR, DAY, PART).map((line) => {
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

write(YEAR, DAY, PART, ranges[index - 1].end + 1);
