import { readOld } from '../../utilities/io.js';

const [YEAR, DAY] = [2021, 21];

export const loadData = (part) => {
  const data = readOld(YEAR, DAY, part);
  const p1Start = Number(data[0].replace('Player 1 starting position: ', '').replace(/[^\d]/g, ''));
  const p2Start = Number(data[1].replace('Player 2 starting position: ', '').replace(/[^\d]/g, ''));

  return { p1Start, p2Start };
};

export const ROLLS = [
  3, 4, 5, 4, 5, 6, 5, 6, 7, 4, 5, 6, 5, 6, 7, 6, 7, 8, 5, 6, 7, 6, 7, 8, 7, 8, 9,
];
