export function part1({ lines }) {
  const player1 = [];
  const player2 = [];
  let parsedPlayer1 = false;

  lines.forEach((line) => {
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

  while (player1.length && player2.length) {
    const p1Plays = player1.shift();
    const p2Plays = player2.shift();

    if (p1Plays > p2Plays) {
      player1.push(p1Plays, p2Plays);
    } else {
      player2.push(p2Plays, p1Plays);
    }
  }

  const winner = player1.length ? player1 : player2;
  const score = winner.reduce((sum, card, index) => sum + (winner.length - index) * card, 0);

  return score;
}
