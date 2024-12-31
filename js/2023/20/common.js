export const PULSE = {
  LOW: 0,
  HIGH: 1,
};

export class Network {
  flipflops = new Map();
  conjunctions = new Map();
  broadcaster;

  constructor(lines) {
    lines.forEach((line) => {
      const [input, output] = line.split(' -> ');
      const outputs = output.split(', ');

      if (input === 'broadcaster') {
        this.broadcaster = new Broadcaster(outputs);
      } else if (line.startsWith('%')) {
        const name = input.split('%')[1];
        this.flipflops.set(name, new FlipFlop(name, outputs));
      } else {
        const name = input.split('&')[1];
        this.conjunctions.set(name, new Conjunction(name, outputs));
      }
    });

    for (const module of [...this.flipflops.values(), ...this.conjunctions.values()]) {
      for (const output of module.outputs) {
        if (this.conjunctions.has(output)) {
          this.conjunctions.get(output).addInput(module);
        }
      }
    }
  }
}

export class Broadcaster {
  outputs;

  constructor(outputs) {
    this.outputs = outputs;
  }

  onReceivePulse(type) {
    return this.outputs.map((output) => ({ type, target: output, origin: 'broadcaster' }));
  }
}

export class FlipFlop {
  name;
  outputs = [];
  on = false;

  constructor(name, outputs) {
    this.name = name;
    this.outputs = outputs;
  }

  onReceivePulse(type) {
    if (type === PULSE.LOW) {
      this.on = !this.on;

      return this.outputs.map((output) => ({
        type: this.on ? PULSE.HIGH : PULSE.LOW,
        target: output,
        origin: this.name,
      }));
    }

    return [];
  }
}

export class Conjunction {
  name;
  inputs = [];
  outputs = [];
  memory = new Map();

  constructor(name, outputs) {
    this.name = name;
    this.outputs = outputs;
  }

  addInput(input) {
    this.inputs.push(input);
    this.memory.set(input.name, PULSE.LOW);
  }

  onReceivePulse(type, origin) {
    this.memory.set(origin, type);
    const allHigh = [...this.memory.values()].every((pulse) => pulse === PULSE.HIGH);

    return this.outputs.map((output) => ({
      type: allHigh ? PULSE.LOW : PULSE.HIGH,
      target: output,
      origin: this.name,
    }));
  }
}
