import { readOld, write } from '../../utilities/io.js';
import { getCavesMap } from './common.js';

const [YEAR, DAY, PART] = [2021, 12, 1];

const data = readOld(YEAR, DAY, PART).map((entry) => entry.trim().split('-'));

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

const cavesByKey = getCavesMap(data);
const paths = [];
const startCave = cavesByKey.get('start');

walk(startCave, []);

write(YEAR, DAY, PART, paths.length);
