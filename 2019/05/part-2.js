import { read, write } from '../../utility.js';

const [YEAR, DAY, PART] = [2019, 5, 2];

const program = read(YEAR, DAY, { splitBy: ',' }).map((n) => Number(n));

const INPUT_VALUE = 5;
const output = [];
let ended = false;

for (let pointer = 0; pointer < program.length; ) {
  const command = program[pointer];
  let commandString = command.toString();

  const op = Number(commandString.substring(commandString.length - 2));
  let modes;

  if (command < 100) {
    modes = ['0', '0'];
  } else if (command < 1000) {
    modes = [commandString[0], '0'];
  } else if (command < 10000) {
    modes = [commandString[1], commandString[0], '0'];
  } else {
    modes = [commandString[2], commandString[1], commandString[0]];
  }

  switch (op) {
    case 1:
    case 2:
      {
        const p1 = program[pointer + 1];
        const p2 = program[pointer + 2];
        const address = program[pointer + 3];

        const p1Value = modes[0] === '0' ? program[p1] : p1;
        const p2Value = modes[1] === '0' ? program[p2] : p2;

        if (op === 1) {
          program[address] = p1Value + p2Value;
        } else {
          program[address] = p1Value * p2Value;
        }

        pointer += 4;
      }
      break;

    case 3:
    case 4:
      {
        const p1 = program[pointer + 1];
        const p1Value = modes[0] === '0' ? program[p1] : p1;

        if (op === 3) {
          program[p1] = INPUT_VALUE;
        } else {
          output.push(p1Value);
        }

        pointer += 2;
      }
      break;

    case 5:
      {
        const p1 = program[pointer + 1];
        const p2 = program[pointer + 2];

        const p1Value = modes[0] === '0' ? program[p1] : p1;
        const p2Value = modes[1] === '0' ? program[p2] : p2;

        if (p1Value !== 0) {
          pointer = p2Value;
        } else {
          pointer += 3;
        }
      }
      break;

    case 6:
      {
        const p1 = program[pointer + 1];
        const p2 = program[pointer + 2];

        const p1Value = modes[0] === '0' ? program[p1] : p1;
        const p2Value = modes[1] === '0' ? program[p2] : p2;

        if (p1Value === 0) {
          pointer = p2Value;
        } else {
          pointer += 3;
        }
      }
      break;

    case 7:
      {
        const p1 = program[pointer + 1];
        const p2 = program[pointer + 2];
        const address = program[pointer + 3];

        const p1Value = modes[0] === '0' ? program[p1] : p1;
        const p2Value = modes[1] === '0' ? program[p2] : p2;

        if (p1Value < p2Value) {
          program[address] = 1;
        } else {
          program[address] = 0;
        }

        pointer += 4;
      }
      break;

    case 8:
      {
        const p1 = program[pointer + 1];
        const p2 = program[pointer + 2];
        const address = program[pointer + 3];

        const p1Value = modes[0] === '0' ? program[p1] : p1;
        const p2Value = modes[1] === '0' ? program[p2] : p2;

        if (p1Value === p2Value) {
          program[address] = 1;
        } else {
          program[address] = 0;
        }

        pointer += 4;
      }
      break;

    case 99:
      ended = true;
  }

  if (ended) break;
}

write(YEAR, DAY, PART, output.pop());
