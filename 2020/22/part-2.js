import { read, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2020, 22, 2];
const player1 = [];
const player2 = [];
let parsedPlayer1 = false;

read(YEAR, DAY, PART).forEach((line) => {
  if (line.startsWith('Player')) return;
  if (!line) {
    parsedPlayer1 = true;
    return;
  }

  if (!parsedPlayer1) {
    player1.push(Number(line));
  } else {
    player2.push(Number(line));
  }
});

function getKey(p1, p2) {
  return `${p1.join('|')}-${p2.join('|')}`;
}

function getScore(deck) {
  return deck.reduce((sum, card, index, deck) => sum + (deck.length - index) * card, 0);
}

function play(p1Deck, p2Deck, cache) {
  while (p1Deck.length && p2Deck.length) {
    const key = getKey(p1Deck, p2Deck);

    if (cache[key]) {
      return { winner: 1 };
    }

    const p1Plays = p1Deck.shift();
    const p2Plays = p2Deck.shift();

    if (p1Deck.length >= p1Plays && p2Deck.length >= p2Plays) {
      const { winner } = play(p1Deck.slice(0, p1Plays), p2Deck.slice(0, p2Plays), {});

      if (winner === 1) {
        p1Deck.push(p1Plays, p2Plays);
      } else {
        p2Deck.push(p2Plays, p1Plays);
      }
    } else if (p1Plays > p2Plays) {
      p1Deck.push(p1Plays, p2Plays);
    } else {
      p2Deck.push(p2Plays, p1Plays);
    }

    cache[key] = 1;
  }

  return {
    winner: p1Deck.length ? 1 : 2,
    score: getScore(p1Deck.length ? p1Deck : p2Deck),
  };
}

const result = play(player1, player2, {});

write(YEAR, DAY, PART, result.score);
