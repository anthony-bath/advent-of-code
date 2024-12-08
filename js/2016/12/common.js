export function execute(instructions, registers) {
  function getValue(arg) {
    if ([...registers.keys()].includes(arg)) {
      return registers.get(arg);
    }

    return Number(arg);
  }

  let ip = 0;

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
    }
  }
}
