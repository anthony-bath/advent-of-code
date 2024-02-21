const { max, min } = Math;

function mark(map, { x, y }, type) {
  map.set(`${x}|${y}`, type);
}

export function getInputElements(data) {
  const input = data.replace(/[\^\$]/g, '');
  let [xMin, xMax, yMin, yMax] = [Infinity, -Infinity, Infinity, -Infinity];

  const map = new Map([['0|0', 'X']]);
  const stack = [];
  let current = { x: 0, y: 0 };

  for (const char of input) {
    mark(map, current, '.');
    xMin = min(xMin, current.x);
    xMax = max(xMax, current.x);
    yMin = min(yMin, current.y);
    yMax = max(yMax, current.y);

    switch (char) {
      case 'N':
        current.y--;
        mark(map, current, '-');
        current.y--;
        break;

      case 'S':
        current.y++;
        mark(map, current, '-');
        current.y++;
        break;

      case 'E':
        current.x++;
        mark(map, current, '|');
        current.x++;
        break;

      case 'W':
        current.x--;
        mark(map, current, '|');
        current.x--;
        break;

      case '(':
        stack.push({ x: current.x, y: current.y });
        break;

      case ')':
        current = stack.pop();
        break;

      case '|':
        const { x, y } = stack[stack.length - 1];
        current = { x, y };
    }
  }

  return { xMin, xMax, yMin, yMax, map };
}

export const deltas = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];
