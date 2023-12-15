import { read, write } from '../../utilities/io.js';
import { hash } from './common.js';

const [YEAR, DAY, PART] = [2023, 15, 2];

const boxes = Array(256)
  .fill()
  .map(() => []);

const expr = /(?<label>\w+).(?<foc>\d?)/;

read(YEAR, DAY, PART, { splitBy: ',' }).forEach((step) => {
  const { label, foc } = step.match(expr).groups;
  const boxNumber = hash(label);
  const position = boxes[boxNumber].findIndex((lens) => lens.label === label);

  if (!foc) {
    if (position !== -1) {
      boxes[boxNumber].splice(position, 1);
    }
  } else {
    if (position !== -1) {
      boxes[boxNumber][position] = { label, foc };
    } else {
      boxes[boxNumber].push({ label, foc });
    }
  }
});

write(
  YEAR,
  DAY,
  PART,
  boxes.reduce((totalPower, box, boxNumber) => {
    return (
      totalPower +
      box.reduce((boxPower, lens, position) => {
        return boxPower + (boxNumber + 1) * (position + 1) * Number(lens.foc);
      }, 0)
    );
  }, 0)
);
