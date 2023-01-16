import { read, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2019, 22, 1];

const DECK_SIZE = 10007;
let deck = [...Array(DECK_SIZE).keys()];

function cutN(deck, n) {
  if (n > 0) {
    deck.push(...deck.splice(0, n));
  } else {
    deck.unshift(...deck.splice(n, Math.abs(n)));
  }
}

function dealN(deck, n) {
  const dealt = [];
  let position = 0;

  while (deck.length) {
    const card = deck.shift();
    dealt[position] = card;
    position = (position + n) % DECK_SIZE;
  }

  return dealt;
}

read(YEAR, DAY, PART).forEach((instruction) => {
  if (instruction.startsWith('cut')) {
    const [_, n] = instruction.split(' ');
    cutN(deck, Number(n));
  } else if (instruction.includes('new stack')) {
    deck.reverse();
  } else {
    deck = dealN(deck, Number(instruction.split(' ').pop()));
  }
});

const result = deck.findIndex((card) => card === 2019);

write(YEAR, DAY, PART, result);
