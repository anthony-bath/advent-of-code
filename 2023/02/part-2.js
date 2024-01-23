export function part2({ lines }) {
  const expr = /(?<count>\d+)\s(?<color>\w+)/g;

  const total = lines.reduce((total, game) => {
    const counts = { red: 0, green: 0, blue: 0 };
    let match;

    while ((match = expr.exec(game)?.groups)) {
      counts[match.color] = Math.max(Number(match.count), counts[match.color]);
    }

    return total + counts.red * counts.blue * counts.green;
  }, 0);

  return total;
}
