import { readOld, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2015, 5, 2];

const double = /([a-z][a-z]).*\1/;
const triple = /([a-z])[a-z]\1/;

let niceCount = 0;

readOld(YEAR, DAY, PART).forEach((string) => {
  if (double.test(string) && triple.test(string)) {
    niceCount++;
  }
});

write(YEAR, DAY, PART, niceCount);
