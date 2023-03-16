import { read, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2016, 25, 1];

const instructions = read(YEAR, DAY, PART).map((line) => line.split(' '));

function execute(instructions, registers) {
  function getValue(arg) {
    if ([...registers.keys()].includes(arg)) {
      return registers.get(arg);
    }

    return Number(arg);
  }

  let ip = 0;
  const output = [];
  let executions = 0;

  while (ip < instructions.length) {
    const [instruction, arg1, arg2] = instructions[ip];

    switch (instruction) {
      case 'cpy':
        registers.set(arg2, getValue(arg1, registers));
        ip++;
        break;

      case 'inc':
        registers.set(arg1, registers.get(arg1) + 1);
        ip++;
        break;

      case 'dec':
        registers.set(arg1, registers.get(arg1) - 1);
        ip++;
        break;

      case 'jnz':
        const x = getValue(arg1, registers);

        if (x !== 0) {
          const y = getValue(arg2, registers);
          ip += y;
        } else {
          ip++;
        }
        break;

      case 'out':
        output.push(getValue(arg1));
        ip++;
    }

    executions++;

    if (output.length === 10) break;
  }

  return output.join('');
}

let value = 1;

while (true) {
  const registers = new Map([
    ['a', value],
    ['b', 0],
    ['c', 0],
    ['d', 0],
  ]);

  const result = execute(instructions, registers);

  if (result === '01'.repeat(5)) {
    break;
  }

  value++;
}

write(YEAR, DAY, PART, value);
