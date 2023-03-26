import { read, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2017, 23, 2];

read(YEAR, DAY, PART);

let [b, c, d, e, f, g, h] = [99, 0, 0, 0, 0, 0, 0];

b = b * 100 + 100000;
c = b + 17000;

do {
  f = 1;
  d = 2;
  e = 2;

  for (d = 2; d * d <= b; d++) {
    if (b % d == 0) {
      f = 0;
      break;
    }
  }

  if (f == 0) h++;

  g = b - c;
  b += 17;
} while (g !== 0);

write(YEAR, DAY, PART, h);
