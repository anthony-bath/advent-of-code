import { read, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2018, 1, 1];

const result = read(YEAR, DAY, PART).reduce((sum, num) => sum + Number(num), 0);

write(YEAR, DAY, PART, result);
