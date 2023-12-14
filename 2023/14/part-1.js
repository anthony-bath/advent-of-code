import { write } from '../../utilities/io.js';
import { tiltNorth, calcLoad, loadData } from './common.js';

const [YEAR, DAY, PART] = [2023, 14, 1];

const { xMax, yMax, blockersByColumn, allStones } = loadData(YEAR, DAY, PART);

tiltNorth(allStones, xMax, blockersByColumn);

write(YEAR, DAY, PART, calcLoad(allStones, yMax));
