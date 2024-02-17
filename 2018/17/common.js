export const TYPE = {
  WATER_AT_REST: '~',
  WATER_FLOWING: '|',
  CLAY: '#',
  EMPTY: '.',
};

function update({ x, y }, type, grid) {
  grid[y][x] = type;
}

function isSolid({ x, y }, grid) {
  return [TYPE.CLAY, TYPE.WATER_AT_REST].includes(grid[y][x]);
}

function isClay({ x, y }, grid) {
  return grid[y][x] === TYPE.CLAY;
}

function isEmpty({ x, y }, grid) {
  return grid[y][x] === TYPE.EMPTY;
}

function extendsToClay({ x, y }, dir, grid) {
  const search = { x, y };

  while (true) {
    const next = { x: search.x + dir, y: search.y };

    if (isEmpty(next, grid)) return false;
    if (isClay(next, grid)) return true;

    search.x += dir;
  }
}

function fill({ x, y }, dir, type, grid) {
  const search = { x, y };

  while (true) {
    const next = { x: search.x + dir, y: search.y };

    if (isClay(next, grid)) return;

    update(next, type, grid);
    search.x += dir;
  }
}

export function count(types, grid) {
  let result = 0;

  for (const row of grid) {
    for (const point of row) {
      if (types.includes(point)) {
        result++;
      }
    }
  }

  return result;
}

export function getInputElements(lines) {
  const { min, max } = Math;

  const verticals = [];
  const horizontals = [];

  for (const line of lines) {
    const [n1, n2, n3] = line.match(/\d+/g).map(Number);

    if (line.startsWith('x')) {
      verticals.push({ x: n1, yStart: n2, yEnd: n3 });
    } else {
      horizontals.push({ y: n1, xStart: n2, xEnd: n3 });
    }
  }

  let [yMin, yMax, xMin, xMax] = [Infinity, -Infinity, Infinity, -Infinity];

  for (const { x, yStart, yEnd } of verticals) {
    yMin = min(yMin, yStart);
    yMax = max(yMax, yEnd);
    xMin = min(xMin, x);
    xMax = max(xMax, x);
  }

  for (const { y, xStart, xEnd } of horizontals) {
    xMin = min(xMin, xStart);
    xMax = max(xMax, xEnd);
    yMin = min(yMin, y);
    yMax = max(yMax, y);
  }

  const grid = Array(yMax + 2)
    .fill()
    .map(() => Array(xMax - xMin + 2).fill(TYPE.EMPTY));

  for (const { x, yStart, yEnd } of verticals) {
    for (let y = yStart; y <= yEnd; y++) {
      grid[y][x - xMin] = TYPE.CLAY;
    }
  }

  for (const { y, xStart, xEnd } of horizontals) {
    for (let x = xStart; x <= xEnd; x++) {
      grid[y][x - xMin] = TYPE.CLAY;
    }
  }

  return { grid, yMin, yMax, xMin };
}

export function flow({ x, y }, data) {
  if (y > data.yMax) return;

  const left = { x: x - 1, y };
  const down = { x, y: y + 1 };
  const right = { x: x + 1, y };

  if (isEmpty(down, data.grid)) {
    if (y > data.yMin) update(down, TYPE.WATER_FLOWING, data.grid);
    flow(down, data);
  }

  if (isSolid(down, data.grid)) {
    if (isEmpty(left, data.grid)) {
      update(left, TYPE.WATER_FLOWING, data.grid);
      flow(left, data);
    }

    if (isEmpty(right, data.grid)) {
      update(right, TYPE.WATER_FLOWING, data.grid);
      flow(right, data);
    }

    if (extendsToClay({ x, y }, -1, data.grid) && extendsToClay({ x, y }, 1, data.grid)) {
      fill({ x, y }, -1, TYPE.WATER_AT_REST, data.grid);
      fill({ x, y }, -1, TYPE.WATER_AT_REST, data.grid);
      update({ x, y }, TYPE.WATER_AT_REST, data.grid);
    }
  }
}
