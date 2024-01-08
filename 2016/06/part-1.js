import { getPositionData } from './common.js';

export function part1({ lines }) {
  const positionData = getPositionData(lines);
  const result = [];

  for (const data of positionData) {
    const [letter] = Object.entries(data)
      .sort(([, c1], [, c2]) => c2 - c1)
      .shift();

    result.push(letter);
  }

  return result.join('');
}
