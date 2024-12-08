export function part1({ lines }) {
  const inputs = lines.map((line) => line.split(''));

  const keypad = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];

  let x = 1;
  let y = 1;

  const code = inputs.reduce((code, line) => {
    for (const input of line) {
      switch (input) {
        case 'L':
          if (x - 1 >= 0) x--;
          break;
        case 'R':
          if (x + 1 <= 2) x++;
          break;
        case 'U':
          if (y - 1 >= 0) y--;
          break;
        case 'D':
          if (y + 1 <= 2) y++;
          break;
      }
    }

    return [...code, keypad[y][x]];
  }, []);

  return code.join('');
}
