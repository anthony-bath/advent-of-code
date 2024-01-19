import { getInputElements, ROLLS } from './common.js';

export function part2({ lines }) {
  const { p1Start, p2Start } = getInputElements(lines);

  function play(p1Pos, p2Pos, p1Score, p2Score, turn) {
    const gameStateKey = [p1Pos, p2Pos, p1Score, p2Score, turn % 2].join('|');

    if (outcomesByState.has(gameStateKey)) {
      return outcomesByState.get(gameStateKey);
    } else if (p1Score >= 21) {
      return [1, 0];
    } else if (p2Score >= 21) {
      return [0, 1];
    }

    let [p1Wins, p2Wins] = [0, 0];

    if (turn % 2 === 0) {
      for (const roll of ROLLS) {
        const p1NextPostion = ((p1Pos + roll - 1) % 10) + 1;
        const p1NextScore = p1Score + p1NextPostion;

        const [p1Win, p2Win] = play(p1NextPostion, p2Pos, p1NextScore, p2Score, turn + 1);

        p1Wins += p1Win;
        p2Wins += p2Win;
      }
    } else {
      for (const roll of ROLLS) {
        const p2NextPosition = ((p2Pos + roll - 1) % 10) + 1;
        const p2NextScore = p2Score + p2NextPosition;

        const [p1Win, p2Win] = play(p1Pos, p2NextPosition, p1Score, p2NextScore, turn - 1);

        p1Wins += p1Win;
        p2Wins += p2Win;
      }
    }

    outcomesByState.set(gameStateKey, [p1Wins, p2Wins]);

    return [p1Wins, p2Wins];
  }

  const outcomesByState = new Map();
  const [p1Wins, p2Wins] = play(p1Start, p2Start, 0, 0, 0);

  return Math.max(p1Wins, p2Wins);
}
