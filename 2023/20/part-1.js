import { write } from '../../utilities/io.js';
import { PULSE, Network } from './common.js';

const [YEAR, DAY, PART] = [2023, 20, 1];
const network = new Network(YEAR, DAY, PART);

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

write(YEAR, DAY, PART, low * high);
