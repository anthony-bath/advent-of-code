export function part2({ lines }) {
  const inputs = lines.map((line) => line.split(''));

  const keypad = [
    [null, null, 1, null, null],
    [null, 2, 3, 4, null],
    [5, 6, 7, 8, 9],
    [null, 'A', 'B', 'C', null],
    [null, null, 'D', null, null],
  ];

  let x = 0;
  let y = 2;

  const code = inputs.reduce((code, line) => {
    for (const input of line) {
      switch (input) {
        case 'L':
          if (x - 1 >= 0 && keypad[y][x - 1] !== null) x--;
          break;
        case 'R':
          if (x + 1 <= 4 && keypad[y][x + 1] !== null) x++;
          break;
        case 'U':
          if (y - 1 >= 0 && keypad[y - 1][x] !== null) y--;
          break;
        case 'D':
          if (y + 1 <= 4 && keypad[y + 1][x] !== null) y++;
          break;
      }
    }

    return [...code, keypad[y][x]];
  }, []);

  return code.join('');
}
