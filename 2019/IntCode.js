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
            state.program[p1] = inputs[inputIndex++];
            state.pointer += 2;
          } else {
            state.pointer += 2;
            return p1Value;
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
        return null;
    }
  }
}
