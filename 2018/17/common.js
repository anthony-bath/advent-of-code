export const TYPE = {
  WATER_AT_REST: '~',
  WATER_FLOWING: '|',
  CLAY: '#',
};

function key({ x, y }) {
  return `${x}|${y}`;
}

function update({ x, y }, type, grid) {
  grid.set(`${x}|${y}`, type);
}

function isSolid({ x, y }, grid) {
  return [TYPE.CLAY, TYPE.WATER_AT_REST].includes(grid.get(key({ x, y })));
}

function isClay({ x, y }, grid) {
  return grid.get(key({ x, y })) === TYPE.CLAY;
}

function isEmpty({ x, y }, grid) {
  return !grid.has(key({ x, y }));
}

function extendsToClay({ x, y }, dir, grid) {
  const search = { x, y };

  while (true) {
    const next = { ...search, x: search.x + dir };

    if (isEmpty(next, grid)) return false;
    if (isClay(next, grid)) return true;

    search.x += dir;
  }
}

function fill({ x, y }, dir, type, grid) {
  const search = { x, y };
  while (true) {
    const next = { ...search, x: search.x + dir };

    if (isClay(next, grid)) return;

    update(next, type, grid);
    search.x += dir;
  }
}

export function count(types, grid) {
  let result = 0;

  for (const point of grid.values()) {
    if (types.includes(point)) {
      result++;
    }
  }

  return result;
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
