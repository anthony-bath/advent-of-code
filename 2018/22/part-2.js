import { manhattan } from '../../utilities/math.js';

export function part2({ lines }) {
  const [depth, [tx, ty]] = lines.map((line) => {
    if (line.startsWith('depth')) {
      return Number(line.match(/\d+/));
    } else {
      return line.match(/\d+/g).map((n) => Number(n));
    }
  });

  const erosionLevels = new Map();

  function setErosionLevel(x, y) {
    let geologicIndex = 0;

    if (x === 0 && y === 0) {
      geologicIndex = 0;
    } else if (x === tx && y === ty) {
      geologicIndex = 0;
    } else if (y === 0) {
      geologicIndex = x * 16807;
    } else if (x === 0) {
      geologicIndex = y * 48271;
    } else {
      const adjKey1 = `${x}|${y - 1}`;
      const adjKey2 = `${x - 1}|${y}`;

      if (!erosionLevels.has(adjKey1)) {
        setErosionLevel(x, y - 1);
      }

      if (!erosionLevels.has(adjKey2)) {
        setErosionLevel(x - 1, y);
      }

      geologicIndex = erosionLevels.get(adjKey1) * erosionLevels.get(adjKey2);
    }

    erosionLevels.set(`${x}|${y}`, (geologicIndex + depth) % 20183);
  }

  function getRegionType(x, y) {
    const key = `${x}|${y}`;

    if (!erosionLevels.has(key)) {
      setErosionLevel(x, y);
    }

    return erosionLevels.get(key) % 3;
  }

  const REGION = {
    ROCKY: 0,
    WET: 1,
    NARROW: 2,
  };

  const ITEM = {
    NEITHER: 0,
    TORCH: 1,
    CLIMBING_GEAR: 2,
  };

  const ALL_ITEMS = [ITEM.NEITHER, ITEM.TORCH, ITEM.CLIMBING_GEAR];

  const VALID_ITEMS_BY_REGION = {
    [REGION.ROCKY]: [ITEM.TORCH, ITEM.CLIMBING_GEAR],
    [REGION.WET]: [ITEM.NEITHER, ITEM.CLIMBING_GEAR],
    [REGION.NARROW]: [ITEM.TORCH, ITEM.NEITHER],
  };

  function isValid(item, currentRegion, targetRegion) {
    return (
      VALID_ITEMS_BY_REGION[currentRegion].includes(item) &&
      VALID_ITEMS_BY_REGION[targetRegion].includes(item)
    );
  }

  function insertIntoSortedQueue(queue, state) {
    let low = 0;
    let high = queue.length;

    while (low < high) {
      let mid = (low + high) >>> 1;

      if (queue[mid].minutes > state.minutes) {
        low = mid + 1;
      } else {
        high = mid;
      }
    }

    queue.splice(low, 0, state);
  }

  const deltas = [
    [0, 1],
    [1, 0],
    [-1, 0],
    [0, -1],
  ];

  let result = null;
  const target = { x: tx, y: ty };
  const maxDistance = manhattan({ x: 0, y: 0 }, target);
  const state = { minutes: 0, x: 0, y: 0, item: ITEM.TORCH, distance: maxDistance };
  const visited = new Map();
  const queue = [state];

  while (queue.length) {
    const current = queue.pop();

    if (current.x === tx && current.y === ty && current.item === ITEM.TORCH) {
      result = current.minutes;
      break;
    }

    const key = `${current.item}|${current.x}|${current.y}`;

    if (!visited.has(key) || visited.get(key) > current.minutes) {
      visited.set(key, current.minutes);
    } else {
      // Been here before at less minutes, no need to search
      continue;
    }

    if (current.distance > maxDistance || current.x > 10 * tx) {
      continue;
    }

    for (const [dx, dy] of deltas) {
      const nextX = current.x + dx;
      const nextY = current.y + dy;

      if (nextX < 0 || nextY < 0) {
        continue;
      }

      for (const item of ALL_ITEMS) {
        if (isValid(item, getRegionType(current.x, current.y), getRegionType(nextX, nextY))) {
          const distance = manhattan({ x: nextX, y: nextY }, target);

          insertIntoSortedQueue(queue, {
            distance,
            item,
            minutes: current.minutes + (item === current.item ? 1 : 8),
            x: nextX,
            y: nextY,
          });
        }
      }
    }
  }

  return result;
}

// 1451 - Too High
// 1345 - Wrong
// 994 - Wrong
