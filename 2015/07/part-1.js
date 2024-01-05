import { readOld, write } from '../../utilities/io.js';
import { Wire } from './common.js';

const [YEAR, DAY, PART] = [2015, 7, 1];

const wires = new Map();

readOld(YEAR, DAY, PART).forEach((line) => {
  const [input, output] = line.split(' -> ');
  wires.set(output, new Wire(output, input.split(' ')));
});

write(YEAR, DAY, PART, wires.get('a').output(wires));
