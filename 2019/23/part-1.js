import { read, write } from '../../utilities/io.js';
import { execute } from '../IntCode.js';

const [YEAR, DAY, PART] = [2019, 23, 1];

const program = read(YEAR, DAY, PART, { splitBy: ',' }).map((n) => Number(n));

const data = {
  queue: [...Array(50).keys()].map(() => []),
  output: [...Array(50).keys()].map(() => []),
  booted: Array(50).fill(0),
};

const states = [...Array(50).keys()].map(() => ({
  pointer: 0,
  program: [...program],
  relativeBase: 0,
}));

let sentTo255 = null;

while (true) {
  states.forEach((state, i) => {
    if (state.halted) return;

    const input = data.booted[i]
      ? data.queue[i].length
        ? [...data.queue[i].splice(0, 2)]
        : [-1]
      : [i];

    const result = execute(state, input);

    data.booted[i] = 1;

    if (result) {
      data.output[i].push(result);

      if (data.output[i].length % 3 === 0) {
        const [address, x, y] = data.output[i].slice(-3);

        if (address === 255) {
          sentTo255 = y;
        } else {
          data.queue[address].push(...[x, y]);
        }
      }
    }
  });

  if (sentTo255) break;
}

write(YEAR, DAY, PART, sentTo255);
