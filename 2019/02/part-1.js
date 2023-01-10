import { read, write } from '../../utility.js';
import { execute } from '../IntCode.js';

const [YEAR, DAY, PART] = [2019, 2, 1];

const input = read(YEAR, DAY, { splitBy: ',' }).map((n) => Number(n));
input[1] = 12;
input[2] = 2;

const state = { pointer: 0, program: [...input] };
execute(state);

write(YEAR, DAY, PART, state.program[0]);
