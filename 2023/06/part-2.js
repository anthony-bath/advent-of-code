import { read, write } from '../../utilities/io.js';
import { solveQuadratic } from '../../utilities/math.js';

const [YEAR, DAY, PART] = [2023, 6, 2];

const lines = read(YEAR, DAY, PART);
const time = Number(lines[0].match(/\d+/g).join(''));
const distance = Number(lines[1].match(/\d+/g).join(''));

const [t1, t2] = solveQuadratic(1, -time, distance);
const chances = Math.floor(t1) - Math.ceil(t2) + 1;

write(YEAR, DAY, PART, chances);
