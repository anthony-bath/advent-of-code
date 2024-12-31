import { hash } from './common.js';

export function part2({ data }) {
  const boxes = Array(256)
    .fill()
    .map(() => new Map());

  const expr = /(?<label>\w+).(?<foc>\d?)/;

  data.split(',').forEach((step) => {
    const { label, foc } = step.match(expr).groups;
    const boxNumber = hash(label);

    if (!foc) {
      boxes[boxNumber].delete(label);
    } else {
      boxes[boxNumber].set(label, foc);
    }
  });

  return boxes.reduce((totalPower, box, boxNumber) => {
    return (
      totalPower +
      [...box.values()].reduce((boxPower, foc, position) => {
        return boxPower + (boxNumber + 1) * (position + 1) * Number(foc);
      }, 0)
    );
  }, 0);
}
