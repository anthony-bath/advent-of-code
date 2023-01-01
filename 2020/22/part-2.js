import { read, write } from '../../utility.js';

const [YEAR, DAY, PART] = [2020, 22, 1];
const player1 = [];
const player2 = [];
let parsedPlayer1 = false;

read(YEAR, DAY).forEach((line) => {
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
  return `${p1.join('|')}|${p2.join('|')}`;
}

function play(player1, player2, game, gameCache) {
  while (player1.length && player2.length) {
    const key = getKey(player1, player2);

    if (gameCache[key]) {
      return { winner: 'p1', player1: [...player1], player2: [...player2] };
    }

    const p1Plays = player1.shift();
    const p2Plays = player2.shift();

    let result;

    if (player1.length >= p1Plays && player2.length >= p2Plays) {
      const { winner } = play([...player1], [...player2], game + 1, {});

      if (winner === 'p1') {
        result = { winner, player1: [...player1, p1Plays, p2Plays], player2: [...player2] };
      } else {
        result = { winner, player1: [...player1], player2: [...player2, p2Plays, p1Plays] };
      }
    } else if (p1Plays > p2Plays) {
      result = { winner: 'p1', player1: [...player1, p1Plays, p2Plays], player2: [...player2] };
    } else {
      result = { winner: 'p2', player1: [...player1], player2: [...player2, p2Plays, p1Plays] };
    }

    gameCache[key] = result;
  }

  if (player1.length) {
    return { winner: 'p1', player1: [...player1], player2: [...player2] };
  } else {
    return { winner: 'p2', player1: [...player1], player2: [...player2] };
  }
}

console.log(play(player1, player2, 1, {}));
