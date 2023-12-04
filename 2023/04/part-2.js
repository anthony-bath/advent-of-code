import { read, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2023, 4, 2];
const WINNING_NUMBER_COUNT = 10;

const copiesByCardId = {};

const count = read(YEAR, DAY, PART).reduce((count, card) => {
  const numbers = card.match(/\d+/g);
  const cardId = Number(numbers.shift());
  const winningNumbers = numbers.slice(0, WINNING_NUMBER_COUNT);
  const myNumbers = numbers.slice(WINNING_NUMBER_COUNT);
  const matches = myNumbers.filter((n) => winningNumbers.includes(n)).length;

  if (!copiesByCardId[cardId]) {
    copiesByCardId[cardId] = 1;
  }

  for (let nextId = cardId + 1; nextId <= cardId + matches; nextId++) {
    if (!copiesByCardId[nextId]) {
      copiesByCardId[nextId] = 1;
    }

    copiesByCardId[nextId] += copiesByCardId[cardId];
  }

  return count + copiesByCardId[cardId];
}, 0);

write(YEAR, DAY, PART, count);
