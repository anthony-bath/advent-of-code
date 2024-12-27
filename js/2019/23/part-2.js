import { execute } from '../IntCode_v2.js';

export function part2({ data }) {
  const program = data.split(',').map(Number);

  const programData = {
    queue: [...Array(50).keys()].map(() => []),
    output: [...Array(50).keys()].map(() => []),
    lastInput: [...Array(50).keys()].map(() => []),
    booted: Array(50).fill(0),
  };

  const NAT = {
    packet: null,
    lastSent: null,
    secondLastSent: null,
    sent: [],
  };

  const states = [...Array(50).keys()].map(() => ({
    pointer: 0,
    program: [...program],
    relativeBase: 0,
  }));

  let repeated = null;
  let done = false;

  while (true) {
    states.forEach((state, i) => {
      const input = programData.booted[i]
        ? programData.queue[i].length > 0
          ? [...programData.queue[i].splice(0, 2)]
          : [-1]
        : [i];

      programData.booted[i] = 1;
      programData.lastInput[i] = [...input];

      const result = execute(state, input);

      if (result) {
        programData.output[i].push(result);

        if (programData.output[i].length % 3 === 0) {
          const [address, x, y] = programData.output[i].slice(-3);

          if (address === 255) {
            NAT.packet = { x, y };

            if (
              programData.lastInput.every((input) => input.length === 1 && input[0] === -1) &&
              programData.queue.every((queue) => queue.length === 0) &&
              NAT.packet
            ) {
              // idle, NAT sends to address 0
              const { x, y } = NAT.packet;
              programData.queue[0].push(...[x, y]);

              NAT.sent.push(y);
              NAT.secondLastSent = NAT.lastSent;
              NAT.lastSent = y;
              NAT.packet = null;

              if (NAT.lastSent === NAT.secondLastSent) {
                repeated = NAT.lastSent;
                // TODO: Work out a fix to avoid this workaround that seems to stem
                //       from a race condition. Maybe re-make the IntCode interpreter
                //       to be multi-threaded, or step each computer 1 by 1
                if (NAT.sent.filter((p) => p === repeated).length >= 5) {
                  done = true;
                }
              }
            }
          } else {
            programData.queue[address].push(...[x, y]);
          }
        }
      }
    });

    if (done) break;
  }

  return repeated;
}
