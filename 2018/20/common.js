class Stack {
  constructor() {
    this.values = [];
  }

  push(value) {
    this.values.push(value);
  }

  peek() {
    return this.values[this.values.length - 1];
  }

  pop() {
    return this.values.pop();
  }
}

function mark(map, { x, y }, type) {
  map.set(`${x}|${y}`, type);
}

export function getData(input) {
  let [xMin, xMax, yMin, yMax] = [Infinity, -Infinity, Infinity, -Infinity];

  const map = new Map([['0|0', 'X']]);
  const stack = new Stack();
  let current = { x: 0, y: 0 };

  for (const char of input) {
    mark(map, current, '.');
    xMin = Math.min(xMin, current.x);
    xMax = Math.max(xMax, current.x);
    yMin = Math.min(yMin, current.y);
    yMax = Math.max(yMax, current.y);

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
        stack.push({ ...current });
        break;

      case ')':
        current = stack.pop();
        break;

      case '|':
        current = { ...stack.peek() };
    }
  }

  return { xMin, xMax, yMin, yMax, map };
}
