import { Wire } from './common.js';
import { part1 } from './part-1.js';

export function part2({ lines }) {
  const wires = new Map();

  lines.forEach((line) => {
    const [input, output] = line.split(' -> ');
    wires.set(output, new Wire(output, input.split(' ')));
  });

  wires.get('b').signal = part1({ lines });

  return wires.get('a').output(wires);
}
