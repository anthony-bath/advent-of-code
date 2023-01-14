import { write } from '../../utilities/io.js';
import { loadData, enhance } from './common.js';

const [YEAR, DAY, PART] = [2021, 20, 1];

let { image, algo } = loadData(PART);
let result = 0;

const STEPS = 2;

for (let step = 0; step < STEPS; step++) {
  const { enhanced, lit } = enhance(image, algo, step);

  image = enhanced;
  result = lit;
}

write(YEAR, DAY, PART, result);
