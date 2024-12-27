import { execute } from '../IntCode_v2.js';

export function part2({ data }) {
  const program = data.split(',').map(Number);
  const state = { pointer: 0, program: [...program], relativeBase: 0, halted: false };
  state.program[0] = 2;

  const output = [];
  const ball = {};
  const paddle = {};
  let input = [0];
  let score = 0;

  while (!state.halted) {
    const result = execute(state, input);

    output.push(result);

    if (output.length % 3 === 0) {
      const [x, y, value] = output.slice(-3);

      if (x === -1 && y === 0) {
        score = value;
      } else if (value === 4) {
        ball.x = x;
        ball.y = y;
      } else if (value === 3) {
        paddle.x = x;
        paddle.y = y;
      }

      if (paddle.x < ball.x) {
        input = [1];
      } else if (paddle.x > ball.x) {
        input = [-1];
      } else {
        input = [0];
      }
    }
  }

  return score;
}
