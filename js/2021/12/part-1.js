import { getCavesMap } from './common.js';

export function part1({ lines }) {
  const caveData = lines.map((entry) => entry.trim().split('-'));

  function walk(cave, path) {
    if (!cave.isLarge && path.includes(cave.key)) {
      return;
    }

    path.push(cave.key);

    if (cave.key === 'end') {
      paths.push(path);
      return;
    }

    cave.connections.forEach((cave) => walk(cave, [...path]));
  }

  const cavesByKey = getCavesMap(caveData);
  const paths = [];
  const startCave = cavesByKey.get('start');

  walk(startCave, []);

  return paths.length;
}
