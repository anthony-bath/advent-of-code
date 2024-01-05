import { readOld, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2015, 5, 1];

const vowels = /[aeiou]/g;
const double = /([a-z])\1/;
const ignore = /(ab|cd|pq|xy)/;

let niceCount = 0;

readOld(YEAR, DAY, PART).forEach((string) => {
  if (string.match(vowels)?.length >= 3 && double.test(string) && !ignore.test(string)) {
    niceCount++;
  }
});

write(YEAR, DAY, PART, niceCount);
