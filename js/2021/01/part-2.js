import { sum } from '../../utilities/array.js';

export function part2({ lines }) {
  const report = lines.map(Number);
  const windowSize = 3;

  let windowIncreaseCount = 0;

  for (let i = 1; i < report.length; i++) {
    const currentWindow = report.slice(i, windowSize + i);

    if (currentWindow.length < windowSize) {
      break;
    }

    const previousWindow = report.slice(i - 1, windowSize + i - 1);

    if (sum(currentWindow) > sum(previousWindow)) {
      windowIncreaseCount++;
    }
  }

  return windowIncreaseCount;
}
