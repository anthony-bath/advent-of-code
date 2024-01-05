import { readOld, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2021, 1, 2];

const data = readOld(YEAR, DAY, PART).map((x) => Number(x));

const windowSize = 3;
let windowIncreaseCount = 0;

for (let i = 1; i < data.length; i++) {
  const currentWindow = data.slice(i, windowSize + i);

  if (currentWindow.length < windowSize) {
    break;
  }

  const previousWindow = data.slice(i - 1, windowSize + i - 1);

  if (sum(currentWindow) > sum(previousWindow)) {
    windowIncreaseCount++;
  }
}

write(YEAR, DAY, PART, windowIncreaseCount);

function sum(array) {
  return array.reduce((result, current) => result + current, 0);
}
