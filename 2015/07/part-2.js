import { read, write } from '../../utilities/io.js';
import { Wire } from './common.js';

const [YEAR, DAY, PART] = [2015, 7, 2];

const wires = new Map();

read(YEAR, DAY, PART).forEach((line) => {
  const [input, output] = line.split(' -> ');
  wires.set(output, new Wire(output, input.split(' ')));
});

wires.get('b').signal = 46065; // Part 1 Solution

write(YEAR, DAY, PART, wires.get('a').output(wires));
