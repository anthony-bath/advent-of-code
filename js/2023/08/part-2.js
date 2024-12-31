import { lcm } from '../../utilities/math.js';

export function part2({ lines }) {
  const directions = lines[0].split('');

  const expr = /(?<node>\w{3}) = \((?<L>\w{3}), (?<R>\w{3})\)/;
  const nodes = lines.slice(2).reduce((nodes, line) => {
    const { node, L, R } = line.match(expr).groups;
    return { ...nodes, [node]: { L, R } };
  }, {});

  let currentNodes = Object.keys(nodes).filter((node) => node.endsWith('A'));

  const steps = currentNodes.map((node) => {
    let current = node;
    let step = 0;

    while (!current.endsWith('Z')) {
      current = nodes[current][directions[step++ % directions.length]];
    }

    return step;
  });

  return lcm(...steps);
}
