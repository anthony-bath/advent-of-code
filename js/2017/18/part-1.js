export function part1({ lines }) {
  const instructions = lines.map((line) => line.split(' '));

  const registers = new Map();

  function getValue(arg) {
    if (/[a-z]/.test(arg)) {
      if (!registers.has(arg)) {
        registers.set(arg, 0);
      }

      return registers.get(arg);
    }

    return Number(arg);
  }

  let pointer = 0;
  let result = null;
  let played = [];

  while (true) {
    const [command, arg1, arg2] = instructions[pointer];

    switch (command) {
      case 'set':
        {
          registers.set(arg1, getValue(arg2));
          pointer++;
        }
        break;

      case 'add':
        {
          registers.set(arg1, (registers.get(arg1) ?? 0) + getValue(arg2));
          pointer++;
        }
        break;

      case 'mul':
        {
          registers.set(arg1, (registers.get(arg1) ?? 0) * getValue(arg2));
          pointer++;
        }
        break;

      case 'mod':
        {
          registers.set(arg1, (registers.get(arg1) ?? 0) % getValue(arg2));
          pointer++;
        }
        break;

      case 'rcv':
        {
          const recovered = getValue(arg1);

          if (recovered !== 0 && !result) {
            result = played.pop();
          }

          pointer++;
        }
        break;

      case 'jgz':
        {
          if (getValue(arg1) > 0) {
            pointer += getValue(arg2);
          } else {
            pointer++;
          }
        }
        break;

      case 'snd': {
        played.push(getValue(arg1));
        pointer++;
      }
    }

    if (pointer >= instructions.length || result) {
      break;
    }
  }

  return result;
}
