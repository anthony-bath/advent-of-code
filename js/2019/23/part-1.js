import { execute } from '../IntCode_v2.js';

export function part1({ data }) {
  const program = data.split(',').map(Number);

  const programData = {
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

      const input = programData.booted[i]
        ? programData.queue[i].length
          ? [...programData.queue[i].splice(0, 2)]
          : [-1]
        : [i];

      const result = execute(state, input);

      programData.booted[i] = 1;

      if (result) {
        programData.output[i].push(result);

        if (programData.output[i].length % 3 === 0) {
          const [address, x, y] = programData.output[i].slice(-3);

          if (address === 255) {
            sentTo255 = y;
          } else {
            programData.queue[address].push(...[x, y]);
          }
        }
      }
    });

    if (sentTo255) break;
  }

  return sentTo255;
}
