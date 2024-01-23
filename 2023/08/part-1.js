export function part1({ lines }) {
  const directions = lines[0].split('');

  const expr = /(?<node>\w{3}) = \((?<L>\w{3}), (?<R>\w{3})\)/;
  const nodes = lines.slice(2).reduce((nodes, line) => {
    const { node, L, R } = line.match(expr).groups;
    return { ...nodes, [node]: { L, R } };
  }, {});

  let step = 0;
  let node = 'AAA';

  while (node !== 'ZZZ') {
    node = nodes[node][directions[step++ % directions.length]];
  }

  return step;
}
