import { read, write } from '../../utility.js';

const [YEAR, DAY, PART] = [2019, 1, 1];

const result = read(YEAR, DAY).reduce((fuel, mass) => fuel + (Math.floor(Number(mass) / 3) - 2), 0);

write(YEAR, DAY, PART, result);
