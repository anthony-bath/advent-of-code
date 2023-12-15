import { read, write } from '../../utilities/io.js';
import { hash } from './common.js';

const [YEAR, DAY, PART] = [2023, 15, 2];

const boxes = Array(256)
  .fill()
  .map(() => new Map());

const expr = /(?<label>\w+).(?<foc>\d?)/;

read(YEAR, DAY, PART, { splitBy: ',' }).forEach((step) => {
  const { label, foc } = step.match(expr).groups;
  const boxNumber = hash(label);

  if (!foc) {
    boxes[boxNumber].delete(label);
  } else {
    boxes[boxNumber].set(label, foc);
  }
});

write(
  YEAR,
  DAY,
  PART,
  boxes.reduce((totalPower, box, boxNumber) => {
    return (
      totalPower +
      [...box.values()].reduce((boxPower, foc, position) => {
        return boxPower + (boxNumber + 1) * (position + 1) * Number(foc);
      }, 0)
    );
  }, 0)
);
