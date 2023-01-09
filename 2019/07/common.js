export function execute(program, inputs) {
  const output = [];
  let ended = false;
  let inputIndex = 0;

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
            program[p1] = inputs[inputIndex++];
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

  return output.pop();
}

export function execute2(state, input) {
  let output;

  while (state.pointer < state.program.length) {
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
          const p1 = state.program[state.pointer + 1];
          const p2 = state.program[state.pointer + 2];
          const address = state.program[state.pointer + 3];

          const p1Value = modes[0] === '0' ? state.program[p1] : p1;
          const p2Value = modes[1] === '0' ? state.program[p2] : p2;

          if (op === 1) {
            state.program[address] = p1Value + p2Value;
          } else {
            state.program[address] = p1Value * p2Value;
          }

          state.pointer += 4;
        }
        break;

      case 3:
      case 4:
        {
          const p1 = state.program[state.pointer + 1];
          const p1Value = modes[0] === '0' ? state.program[p1] : p1;

          if (op === 3) {
            if (!state.phased) {
              state.program[p1] = state.phase;
              state.phased = true;
            } else {
              state.program[p1] = input;
            }
          } else {
            output = p1Value;
          }

          state.pointer += 2;

          if (op === 4 && !state.halted) {
            return output;
          }
        }
        break;

      case 5:
        {
          const p1 = state.program[state.pointer + 1];
          const p2 = state.program[state.pointer + 2];

          const p1Value = modes[0] === '0' ? state.program[p1] : p1;
          const p2Value = modes[1] === '0' ? state.program[p2] : p2;

          if (p1Value !== 0) {
            state.pointer = p2Value;
          } else {
            state.pointer += 3;
          }
        }
        break;

      case 6:
        {
          const p1 = state.program[state.pointer + 1];
          const p2 = state.program[state.pointer + 2];

          const p1Value = modes[0] === '0' ? state.program[p1] : p1;
          const p2Value = modes[1] === '0' ? state.program[p2] : p2;

          if (p1Value === 0) {
            state.pointer = p2Value;
          } else {
            state.pointer += 3;
          }
        }
        break;

      case 7:
        {
          const p1 = state.program[state.pointer + 1];
          const p2 = state.program[state.pointer + 2];
          const address = state.program[state.pointer + 3];

          const p1Value = modes[0] === '0' ? state.program[p1] : p1;
          const p2Value = modes[1] === '0' ? state.program[p2] : p2;

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
          const p1 = state.program[state.pointer + 1];
          const p2 = state.program[state.pointer + 2];
          const address = state.program[state.pointer + 3];

          const p1Value = modes[0] === '0' ? state.program[p1] : p1;
          const p2Value = modes[1] === '0' ? state.program[p2] : p2;

          if (p1Value === p2Value) {
            state.program[address] = 1;
          } else {
            state.program[address] = 0;
          }

          state.pointer += 4;
        }
        break;

      case 99:
        state.halted = true;
    }

    if (state.halted) break;
  }

  return output;
}
