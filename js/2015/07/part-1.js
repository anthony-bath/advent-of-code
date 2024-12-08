import { Wire } from './common.js';

export function part1({ lines }) {
  const wires = new Map();

  lines.forEach((line) => {
    const [input, output] = line.split(' -> ');
    wires.set(output, new Wire(output, input.split(' ')));
  });

  return wires.get('a').output(wires);
}
