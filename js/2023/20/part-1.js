import { PULSE, Network } from './common.js';

export function part1({ lines }) {
  const network = new Network(lines);

  let [low, high] = [1000, 0];

  for (let i = 0; i < 1000; i++) {
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

      if (pulses.length === 0) continue;

      queue.push(...pulses);
      pulses[0].type === PULSE.LOW ? (low += pulses.length) : (high += pulses.length);
    }
  }

  return low * high;
}
