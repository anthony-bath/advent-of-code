export function part1({ lines: input }) {
  const STEPS = Number(input[1].match(/\d+/g)[0]);

  const states = new Map();

  for (let line = 3; line < input.length; line += 10) {
    const ruleIf0 = new Rule(
      Number(input[line + 2].match(/\d+/g)[0]),
      input[line + 3].endsWith('right.') ? 1 : -1,
      input[line + 4].split(' ').pop().replace('.', '')
    );

    const ruleIf1 = new Rule(
      Number(input[line + 6].match(/\d+/g)[0]),
      input[line + 7].endsWith('right.') ? 1 : -1,
      input[line + 8].split(' ').pop().replace('.', '')
    );

    const name = input[line].match(/[A-F]/g)[0];

    states.set(name, new State(name, ruleIf0, ruleIf1));
  }

  const tape = new Map([[0, 0]]);
  let position = 0;
  let currentState = input[0].split(' ').pop().replace('.', '');

  for (let step = 0; step < STEPS; step++) {
    const state = states.get(currentState);
    const result = state.execute(tape, position);

    position = result.position;
    currentState = result.state;
  }

  return [...tape.values()].filter((x) => x === 1).length;
}

class State {
  constructor(name, ruleIf0, ruleIf1) {
    this.name = name;
    this.ruleIf0 = ruleIf0;
    this.ruleIf1 = ruleIf1;
  }

  execute(data, position) {
    const value = data.get(position) ?? 0;

    if (value === 0) {
      return this.ruleIf0.execute(data, position);
    } else {
      return this.ruleIf1.execute(data, position);
    }
  }
}

class Rule {
  constructor(writeValue, direction, nextState) {
    this.writeValue = writeValue;
    this.direction = direction;
    this.nextState = nextState;
  }

  execute(data, position) {
    data.set(position, this.writeValue);
    return { position: position + this.direction, state: this.nextState };
  }
}
