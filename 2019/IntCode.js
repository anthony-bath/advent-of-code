const MODE = {
  POSITION: '0',
  IMMEDIATE: '1',
  RELATIVE: '2',
};

export function execute(state, inputs) {
  while (!state.halted) {
    const command = state.program[state.pointer];
    let commandString = command.toString();

    const op = Number(commandString.substring(commandString.length - 2));
    let modes;

    if (command < 100) {
      modes = [MODE.POSITION, MODE.POSITION, MODE.POSITION];
    } else if (command < 1000) {
      modes = [commandString[0], MODE.POSITION, MODE.POSITION];
    } else if (command < 10000) {
      modes = [commandString[1], commandString[0], MODE.POSITION];
    } else {
      modes = [commandString[2], commandString[1], commandString[0]];
    }

    switch (op) {
      case 1:
      case 2:
        {
          const params = getParameters(3, modes, state);

          const p1Value = getParameterValue(params[0], state);
          const p2Value = getParameterValue(params[1], state);
          const address = getAddress(modes[2], params[2].raw, state.relativeBase);

          if (op === 1) {
            state.program[address] = p1Value + p2Value;
          } else {
            state.program[address] = p1Value * p2Value;
          }

          state.pointer += 4;
        }
        break;

      case 3:
        {
          if (!inputs.length) {
            return null;
          }

          const params = getParameters(1, modes, state);
          const address = getAddress(modes[0], params[0].raw, state.relativeBase);

          state.program[address] = inputs.shift();
          state.pointer += 2;
        }
        break;

      case 4: {
        const params = getParameters(1, modes, state);
        const p1Value = getParameterValue(params[0], state);

        state.pointer += 2;
        return p1Value;
      }

      case 5:
        {
          const params = getParameters(2, modes, state);

          const p1Value = getParameterValue(params[0], state);
          const p2Value = getParameterValue(params[1], state);

          if (p1Value !== 0) {
            state.pointer = p2Value;
          } else {
            state.pointer += 3;
          }
        }
        break;

      case 6:
        {
          const params = getParameters(2, modes, state);

          const p1Value = getParameterValue(params[0], state);
          const p2Value = getParameterValue(params[1], state);

          if (p1Value === 0) {
            state.pointer = p2Value;
          } else {
            state.pointer += 3;
          }
        }
        break;

      case 7:
        {
          const params = getParameters(3, modes, state);

          const p1Value = getParameterValue(params[0], state);
          const p2Value = getParameterValue(params[1], state);
          const address = getAddress(modes[2], params[2].raw, state.relativeBase);

          if (p1Value < p2Value) {
            state.program[address] = 1;
          } else {
            state.program[address] = 0;
          }

          state.pointer += 4;
        }
        break;

      case 8:
        {
          const params = getParameters(3, modes, state);

          const p1Value = getParameterValue(params[0], state);
          const p2Value = getParameterValue(params[1], state);
          const address = getAddress(modes[2], params[2].raw, state.relativeBase);

          if (p1Value === p2Value) {
            state.program[address] = 1;
          } else {
            state.program[address] = 0;
          }

          state.pointer += 4;
        }
        break;

      case 9:
        {
          const params = getParameters(1, modes, state);
          const p1Value = getParameterValue(params[0], state);

          state.relativeBase += p1Value;
          state.pointer += 2;
        }
        break;

      case 99:
        state.halted = true;
        return null;
    }
  }
}

class Parameter {
  constructor(raw, mode) {
    this.raw = raw;
    this.mode = mode;
  }
}

function getParameters(count, modes, state) {
  const output = [];

  for (let i = 1; i <= count; i++) {
    output.push(new Parameter(state.program[state.pointer + i], modes[i - 1]));
  }

  return output;
}

function getAddress(mode, address, relativeBase) {
  return mode === MODE.RELATIVE ? address + relativeBase : address;
}

function getFromAddress(address, state) {
  if (state.program[address] === undefined) {
    state.program[address] = 0;
  }

  return state.program[address];
}

function getParameterValue(parameter, state) {
  switch (parameter.mode) {
    case MODE.POSITION:
      return getFromAddress(parameter.raw, state);

    case MODE.IMMEDIATE:
      return parameter.raw;

    case MODE.RELATIVE:
      return getFromAddress(parameter.raw + state.relativeBase, state);
  }
}
