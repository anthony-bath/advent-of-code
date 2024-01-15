const MODE = {
  POSITON: '0',
  IMMEDIATE: '1',
  RELATIVE: '2',
};

export function execute(state, inputs) {
  let inputIndex = 0;

  while (!state.halted) {
    const command = state.program[state.pointer];
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
          const p1 = getFromAddress(state.pointer + 1, state);
          const p2 = getFromAddress(state.pointer + 2, state);
          const address = getFromAddress(state.pointer + 3, state);

          const p1Value = getParameterValue(p1, modes[0], state);
          const p2Value = getParameterValue(p2, modes[1], state);

          if (op === 1) {
            state.program[modes[2] === MODE.RELATIVE ? address + state.relativeBase : address] =
              p1Value + p2Value;
          } else {
            state.program[modes[2] === MODE.RELATIVE ? address + state.relativeBase : address] =
              p1Value * p2Value;
          }

          state.pointer += 4;
        }
        break;

      case 3:
      case 4:
        {
          const p1 = getFromAddress(state.pointer + 1, state);
          const p1Value = getParameterValue(p1, modes[0], state);

          if (op === 3) {
            if (modes[0] === MODE.RELATIVE) {
              state.program[p1 + state.relativeBase] = inputs[inputIndex++];
            } else {
              state.program[p1] = inputs[inputIndex++];
            }
            state.pointer += 2;
          } else {
            state.pointer += 2;
            return p1Value;
          }
        }
        break;

      case 5:
        {
          const p1 = getFromAddress(state.pointer + 1, state);
          const p2 = getFromAddress(state.pointer + 2, state);

          const p1Value = getParameterValue(p1, modes[0], state);
          const p2Value = getParameterValue(p2, modes[1], state);

          if (p1Value !== 0) {
            state.pointer = p2Value;
          } else {
            state.pointer += 3;
          }
        }
        break;

      case 6:
        {
          const p1 = getFromAddress(state.pointer + 1, state);
          const p2 = getFromAddress(state.pointer + 2, state);

          const p1Value = getParameterValue(p1, modes[0], state);
          const p2Value = getParameterValue(p2, modes[1], state);

          if (p1Value === 0) {
            state.pointer = p2Value;
          } else {
            state.pointer += 3;
          }
        }
        break;

      case 7:
        {
          const p1 = getFromAddress(state.pointer + 1, state);
          const p2 = getFromAddress(state.pointer + 2, state);
          const address = getFromAddress(state.pointer + 3, state);

          const p1Value = getParameterValue(p1, modes[0], state);
          const p2Value = getParameterValue(p2, modes[1], state);

          if (p1Value < p2Value) {
            state.program[modes[2] === MODE.RELATIVE ? address + state.relativeBase : address] = 1;
          } else {
            state.program[modes[2] === MODE.RELATIVE ? address + state.relativeBase : address] = 0;
          }

          state.pointer += 4;
        }
        break;

      case 8:
        {
          const p1 = getFromAddress(state.pointer + 1, state);
          const p2 = getFromAddress(state.pointer + 2, state);
          const address = getFromAddress(state.pointer + 3, state);

          const p1Value = getParameterValue(p1, modes[0], state);
          const p2Value = getParameterValue(p2, modes[1], state);

          if (p1Value === p2Value) {
            state.program[modes[2] === MODE.RELATIVE ? address + state.relativeBase : address] = 1;
          } else {
            state.program[modes[2] === MODE.RELATIVE ? address + state.relativeBase : address] = 0;
          }

          state.pointer += 4;
        }
        break;

      case 9:
        {
          const p1 = getFromAddress(state.pointer + 1, state);
          const p1Value = getParameterValue(p1, modes[0], state);

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

function getFromAddress(address, state) {
  if (state.program[address] === undefined) {
    state.program[address] = 0;
  }

  return state.program[address];
}

function getParameterValue(parameterRaw, mode, state) {
  switch (mode) {
    case MODE.POSITON:
      return getFromAddress(parameterRaw, state);

    case MODE.IMMEDIATE:
      return parameterRaw;

    case MODE.RELATIVE:
      return getFromAddress(parameterRaw + state.relativeBase, state);
  }
}
