import { write } from '../../utilities/io.js';
import { loadData } from './common.js';

const [YEAR, DAY, PART] = [2021, 18, 1];

const fish = loadData(PART);
const result = fish.reduce((result, f) => result.add(f)).magnitude();

write(YEAR, DAY, PART, result);
