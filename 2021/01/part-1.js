import { read, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2021, 1, 1];

const data = read(YEAR, DAY, PART).map((x) => Number(x));

write(
  YEAR,
  DAY,
  PART,
  data.reduce((depthIncreaseCount, depth, i) => {
    return i === 0 ? depthIncreaseCount : depthIncreaseCount + (depth > data[i - 1] ? 1 : 0);
  }, 0)
);
