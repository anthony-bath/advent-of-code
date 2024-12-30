import { getCompare } from './common.js';

export function part2({ lines }) {
  const markers = [[[2]], [[6]]];
  const packets = [...markers];

  for (const line of lines) {
    if (!line) continue;
    packets.push(JSON.parse(line));
  }

  packets.sort(getCompare(1));

  return (1 + packets.indexOf(markers[0])) * (1 + packets.indexOf(markers[1]));
}
