import { write } from '../../utility.js';
import { loadData, enhance } from './common.js';

const [YEAR, DAY, PART] = [2021, 20, 2];

let { image, algo } = loadData();
let result = 0;

const STEPS = 50;

for (let step = 0; step < STEPS; step++) {
  const { enhanced, lit } = enhance(image, algo, step);

  image = enhanced;
  result = lit;
}

write(YEAR, DAY, PART, result);
