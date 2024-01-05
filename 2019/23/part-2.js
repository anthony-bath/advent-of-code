import { readOld, write } from '../../utilities/io.js';
import { execute } from '../IntCode.js';

const [YEAR, DAY, PART] = [2019, 23, 2];

const program = readOld(YEAR, DAY, PART, { splitBy: ',' }).map((n) => Number(n));

const data = {
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
    const input = data.booted[i]
      ? data.queue[i].length > 0
        ? [...data.queue[i].splice(0, 2)]
        : [-1]
      : [i];

    data.booted[i] = 1;
    data.lastInput[i] = [...input];

    const result = execute(state, input);

    if (result) {
      data.output[i].push(result);

      if (data.output[i].length % 3 === 0) {
        const [address, x, y] = data.output[i].slice(-3);

        if (address === 255) {
          NAT.packet = { x, y };

          if (
            data.lastInput.every((input) => input.length === 1 && input[0] === -1) &&
            data.queue.every((queue) => queue.length === 0) &&
            NAT.packet
          ) {
            // idle, NAT sends to address 0
            const { x, y } = NAT.packet;
            data.queue[0].push(...[x, y]);

            NAT.sent.push(y);
            NAT.secondLastSent = NAT.lastSent;
            NAT.lastSent = y;
            NAT.packet = null;

            if (NAT.lastSent === NAT.secondLastSent) {
              repeated = NAT.lastSent;
              console.log(`Possible: ${repeated}`);
              // TODO: Work out a fix to avoid this workaround that seems to stem
              //       from a race condition. Maybe re-make the IntCode interpreter
              //       to be multi-threaded, or step each computer 1 by 1
              if (NAT.sent.filter((p) => p === repeated).length >= 5) {
                done = true;
              }
            }
          }
        } else {
          data.queue[address].push(...[x, y]);
        }
      }
    }
  });

  if (done) break;
}

write(YEAR, DAY, PART, repeated);
