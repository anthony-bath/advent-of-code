import { PULSE, Network } from './common.js';
import { lcm } from '../../utilities/math.js';

export function part2({ lines }) {
  const network = new Network(lines);
  const modules = [...network.flipflops.values(), ...network.conjunctions.values()];

  let rxInput;

  for (const module of modules) {
    if (module.outputs.includes('rx')) {
      rxInput = module.name;
      break;
    }
  }

  let rxInputInputs = [];

  for (const module of modules) {
    if (module.outputs.includes(rxInput)) {
      rxInputInputs.push(module.name);
    }
  }

  let cycles = [];
  let presses = 0;

  while (rxInputInputs.length) {
    presses += 1;

    const queue = [{ type: PULSE.LOW, target: 'broadcaster', origin: 'button' }];

    while (queue.length) {
      const { type, target, origin } = queue.shift();

      let pulses = [];

      switch (true) {
        case target === 'broadcaster':
          pulses = network.broadcaster.onReceivePulse(type);
          break;

        case network.flipflops.has(target):
          pulses = network.flipflops.get(target).onReceivePulse(type);
          break;

        case network.conjunctions.has(target):
          pulses = network.conjunctions.get(target).onReceivePulse(type, origin);
          break;
      }

      for (const pulse of pulses) {
        if (rxInputInputs.includes(pulse.target) && pulse.type === PULSE.LOW) {
          cycles.push(presses);
          rxInputInputs = rxInputInputs.filter((input) => input !== pulse.target);
        }

        queue.push(pulse);
      }
    }
  }

  return lcm(...cycles);
}
