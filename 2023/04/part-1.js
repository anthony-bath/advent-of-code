import { read, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2023, 4, 1];
const WINNING_NUMBER_COUNT = 10;

const score = read(YEAR, DAY, PART).reduce((score, card) => {
  const numbers = card.match(/\d+/g).slice(1);
  const winningNumbers = numbers.slice(0, WINNING_NUMBER_COUNT);
  const myNumbers = numbers.slice(WINNING_NUMBER_COUNT);
  const matches = myNumbers.filter((n) => winningNumbers.includes(n));

  return score + (matches.length > 0 ? Math.pow(2, matches.length - 1) : 0);
}, 0);

write(YEAR, DAY, PART, score);
