export function part1({ lines }) {
  const MAXES = {
    red: 12,
    green: 13,
    blue: 14,
  };

  const expr = /(?<count>\d+)\s(?<color>\w+)/g;

  const total = lines.reduce((total, game) => {
    const id = Number(game.match(/\d+/g)[0]);
    let possible = true;
    let match;

    while ((match = expr.exec(game)?.groups)) {
      const color = match.color;

      if (Number(match.count) > MAXES[color]) {
        possible = false;
        expr.lastIndex = 0;
        break;
      }
    }

    return total + (possible ? id : 0);
  }, 0);

  return total;
}
