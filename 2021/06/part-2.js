import { readOld, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2021, 6, 2];

const fishCountByAge = Array(9).fill(0);

readOld(YEAR, DAY, PART, { splitBy: ',' }).forEach((n) => fishCountByAge[n]++);

const DAYS = 256;

for (let day = 0; day < DAYS; day++) {
  const initialFishCountByAge = [...fishCountByAge];

  fishCountByAge[0] = initialFishCountByAge[1];
  fishCountByAge[1] = initialFishCountByAge[2];
  fishCountByAge[2] = initialFishCountByAge[3];
  fishCountByAge[3] = initialFishCountByAge[4];
  fishCountByAge[4] = initialFishCountByAge[5];
  fishCountByAge[5] = initialFishCountByAge[6];
  fishCountByAge[6] = initialFishCountByAge[7] + initialFishCountByAge[0];
  fishCountByAge[7] = initialFishCountByAge[8];
  fishCountByAge[8] = initialFishCountByAge[0];
}

write(
  YEAR,
  DAY,
  PART,
  fishCountByAge.reduce((count, age) => (count += age), 0)
);
