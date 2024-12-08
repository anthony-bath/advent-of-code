export function run(instructions, registers, output) {
  let pointer = 0;

  while (pointer < instructions.length) {
    const [command, arg1, arg2] = instructions[pointer];

    switch (command) {
      case 'jio':
        if (registers[arg1] === 1) pointer += Number(arg2);
        else pointer += 1;
        break;
      case 'jie':
        if (registers[arg1] % 2 === 0) pointer += Number(arg2);
        else pointer += 1;
        break;
      case 'jmp':
        pointer += Number(arg1);
        break;
      case 'inc':
        registers[arg1]++;
        pointer += 1;
        break;
      case 'hlf':
        registers[arg1] /= 2;
        pointer += 1;
        break;
      case 'tpl':
        registers[arg1] *= 3;
        pointer += 1;
        break;
    }
  }

  return registers[output];
}
