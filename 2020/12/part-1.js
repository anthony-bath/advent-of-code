const { abs } = Math;

export function part1({ lines }) {
  const expr = /(?<instruction>[NSEWFLR])(?<amount>\d+)/;

  let facing = 90;
  let x = 0;
  let y = 0;

  lines.forEach((line) => {
    let { instruction, amount } = line.match(expr).groups;
    amount = Number(amount);

    switch (instruction) {
      case 'N':
        y -= amount;
        break;

      case 'S':
        y += amount;
        break;

      case 'E':
        x += amount;
        break;

      case 'W':
        x -= amount;
        break;

      case 'R':
        facing = (facing + amount) % 360;
        break;

      case 'L':
        facing = (facing + (360 - amount)) % 360;
        break;

      case 'F':
        switch (facing) {
          case 0:
            y -= amount;
            break;

          case 90:
            x += amount;
            break;

          case 180:
            y += amount;
            break;

          case 270:
            x -= amount;
            break;
        }
    }
  });

  return abs(x) + abs(y);
}
