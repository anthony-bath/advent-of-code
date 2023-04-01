import { read, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2015, 7, 2];

function getValue(input, wires) {
  const value = Number(input);

  if (!Number.isNaN(value)) {
    return value;
  } else {
    return wires.get(input).output(wires);
  }
}

class Wire {
  constructor(name, input) {
    this.name = name;
    this.input = input;
    this.signal = null;
  }

  output(wires) {
    if (this.signal !== null) {
      return this.signal;
    }

    switch (this.input.length) {
      case 1:
        const value = getValue(this.input[0], wires);
        this.signal = value;
        break;

      case 2:
        this.signal = ~wires.get(this.input[1]).output(wires);
        break;

      case 3:
        const left = getValue(this.input[0], wires);
        const right = getValue(this.input[2], wires);

        switch (this.input[1]) {
          case 'OR':
            this.signal = left | right;
            break;
          case 'AND':
            this.signal = left & right;
            break;
          case 'LSHIFT':
            this.signal = left << right;
            break;
          case 'RSHIFT':
            this.signal = left >> right;
            break;
        }
    }

    return this.signal;
  }
}

const wires = new Map();

read(YEAR, DAY, PART).forEach((line) => {
  const [input, output] = line.split(' -> ');
  wires.set(output, new Wire(output, input.split(' ')));
});

wires.get('b').signal = 46065; // Part 1 Solution

write(YEAR, DAY, PART, wires.get('a').output(wires));
