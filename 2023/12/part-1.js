import { readOld, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2023, 12, 1];

function generateCombinations(str) {
  const combinations = [];

  function generate(current, index) {
    if (index === str.length) {
      combinations.push(current);
      return;
    }

    if (str[index] === '?') {
      generate(current + '.', index + 1);
      generate(current + '#', index + 1);
    } else {
      generate(current + str[index], index + 1);
    }
  }

  generate('', 0);
  return combinations;
}

const count = readOld(YEAR, DAY, PART).reduce((count, line) => {
  const [arrangement, springList] = line.split(' ');
  const springCounts = springList.match(/\d+/g);

  const springPattern = springCounts.reduce((expr, count, i) => {
    if (i === springCounts.length - 1) {
      return `${expr}#{${count}}`;
    }

    return `${expr}#{${count}}\\.{1,}`;
  }, '');

  const pattern = `^\\.{0,}${springPattern}\\.{0,}$`;
  const expr = new RegExp(pattern);

  let currentCount = 0;

  for (const combo of generateCombinations(arrangement)) {
    if (expr.test(combo)) {
      currentCount++;
    }
  }

  return count + currentCount;
}, 0);

write(YEAR, DAY, PART, count);
