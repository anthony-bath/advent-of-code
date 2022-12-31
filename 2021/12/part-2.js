import { read, write } from '../../utility.js';
import { Path, getCavesMap } from './common.js';

const [YEAR, DAY, PART] = [2021, 12, 1];

const data = read(YEAR, DAY).map((entry) => entry.trim().split('-'));

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

const cavesByKey = getCavesMap(data);
let paths = 0;

walk(cavesByKey.get('start'), new Path());

write(YEAR, DAY, PART, paths);
