import { readOld, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2016, 19, 1];

const n = Number(readOld(YEAR, DAY, PART, { splitBy: null }));

// Josephus Problem
const result = 2 * (n - Math.pow(2, Math.floor(Math.log2(n)))) + 1;

write(YEAR, DAY, PART, result);
