import { sum } from '../../utilities/array.js';
import { read, write } from '../../utilities/io.js';
import { factors } from '../../utilities/math.js';

const [YEAR, DAY, PART] = [2018, 19, 2];

read(YEAR, DAY, PART);
write(YEAR, DAY, PART, sum(factors(10551298)));
