export function part1({ lines }) {
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

  lines.forEach((instruction) => {
    if (instruction.startsWith('cut')) {
      const [_, n] = instruction.split(' ');
      cutN(deck, Number(n));
    } else if (instruction.includes('new stack')) {
      deck.reverse();
    } else {
      deck = dealN(deck, Number(instruction.split(' ').pop()));
    }
  });

  return deck.findIndex((card) => card === 2019);
}
