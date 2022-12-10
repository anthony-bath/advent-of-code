import { read, write } from '../utility.js';

const overlappingPairCount = read(4).reduce((count, ranges) => {
  const [r1, r2] = ranges.split(',');
  const [r1Start, r1End] = r1.split('-').map((n) => parseInt(n));
  const [r2Start, r2End] = r2.split('-').map((n) => parseInt(n));

  if ((r2Start >= r1Start && r2End <= r1End) || (r1Start >= r2Start && r1End <= r2End)) {
    return ++count;
  }

  return count;
}, 0);

write(4, 1, `${overlappingPairCount}`);
