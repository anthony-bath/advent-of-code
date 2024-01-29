export function part1({ lines }) {
  let position = { x: 0, y: 0 };
  let [xMin, xMax, yMin, yMax] = [0, 0, 0, 0];

  const instructions = lines.map((line) => {
    const [direction, distanceString] = line.split(' ');
    const distance = Number(distanceString);

    switch (direction) {
      case 'L':
        position.x -= distance;
        xMin = Math.min(xMin, position.x);
        break;

      case 'R':
        position.x += distance;
        xMax = Math.max(xMax, position.x);
        break;

      case 'U':
        position.y += distance;
        yMax = Math.max(yMax, position.y);
        break;

      case 'D':
        position.y -= distance;
        yMin = Math.min(yMin, position.y);
        break;
    }

    return [direction, distance];
  });

  const grid = Array(yMax - yMin + 1)
    .fill()
    .map(() => Array(xMax - xMin + 1).fill('.'));

  position = { x: -xMin, y: -yMin };

  for (const [direction, distance] of instructions) {
    switch (direction) {
      case 'L':
        for (let i = 0; i < distance; i++) {
          position.x--;
          grid[position.y][position.x] = '#';
        }
        break;

      case 'R':
        for (let i = 0; i < distance; i++) {
          position.x++;
          grid[position.y][position.x] = '#';
        }
        break;

      case 'U':
        for (let i = 0; i < distance; i++) {
          position.y++;
          grid[position.y][position.x] = '#';
        }
        break;

      case 'D':
        for (let i = 0; i < distance; i++) {
          position.y--;
          grid[position.y][position.x] = '#';
        }
        break;
    }
  }

  function floodFill(grid, x, y) {
    const stack = [];
    stack.push([x, y]);

    while (stack.length > 0) {
      const [x, y] = stack.pop();

      if (grid[y][x] === '.') {
        grid[y][x] = '#';

        if (x - 1 >= 0) {
          stack.push([x - 1, y]);
        }
        if (x + 1 < grid[0].length) {
          stack.push([x + 1, y]);
        }
        if (y - 1 >= 0) {
          stack.push([x, y - 1]);
        }
        if (y + 1 < grid.length) {
          stack.push([x, y + 1]);
        }
      }
    }
  }

  floodFill(grid, -xMin + 1, -yMin + 1);

  let area = 0;

  for (const row of grid) {
    for (const cell of row) {
      if (cell === '#') {
        area++;
      }
    }
  }

  return area;
}
