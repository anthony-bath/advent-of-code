import { Path, getCavesMap } from './common.js';

export function part2({ lines }) {
  const caveData = lines.map((entry) => entry.trim().split('-'));

  function walk(cave, path) {
    if (!cave.isLarge && !path.canVisitCave(cave.key)) {
      return;
    }

    path.addCave(cave);

    if (cave.key === 'end') {
      paths++;
      return;
    }

    cave.connections.forEach((cave) => walk(cave, new Path(path)));
  }

  const cavesByKey = getCavesMap(caveData);
  let paths = 0;

  walk(cavesByKey.get('start'), new Path());

  return paths;
}
