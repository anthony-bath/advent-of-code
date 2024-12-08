export function execute(instructions, registers) {
  function getValue(arg) {
    if ([...registers.keys()].includes(arg)) {
      return registers.get(arg);
    }

    return Number(arg);
  }

  const registerNames = [...registers.keys()];

  let ip = 0;

  while (ip < instructions.length) {
    const [instruction, arg1, arg2] = instructions[ip];

    switch (instruction) {
      case 'mul':
        const a1 = getValue(arg1);
        const a2 = getValue(arg2);

        registers.set('a', a1 * a2);
        ip++;
        break;

      case 'cpy':
        if (registerNames.includes(arg2)) {
          registers.set(arg2, getValue(arg1, registers));
        }

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

      case 'tgl':
        const n = getValue(arg1, registers);

        if (ip + n < instructions.length) {
          const [tInstruction, tArg1, tArg2] = instructions[ip + n];

          switch (tInstruction) {
            case 'inc':
              instructions[ip + n] = ['dec', `${tArg1}`];
              break;

            case 'dec':
              instructions[ip + n] = ['inc', `${tArg1}`];
              break;

            case 'jnz':
              instructions[ip + n] = ['cpy', `${tArg1}`, `${tArg2}`];
              break;

            case 'cpy':
              instructions[ip + n] = ['jnz', `${tArg1}`, `${tArg2}`];
              break;

            case 'tgl':
              instructions[ip + n] = ['inc', `${tArg1}`];
          }
        }

        ip++;
    }
  }
}
