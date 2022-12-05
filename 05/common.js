import fs from 'fs';

const END_DATA = ' 1   2   3   4   5   6   7   8   9 ';
const chunkExpr = new RegExp(/.{1,4}/g);
const itemExpr = new RegExp(/[^A-Z]/g);
const instructionExpr = new RegExp(/\d+/g);

export function loadData() {
  const stacks = [];
  const instructions = [];
  let parsedData = false;

  fs.readFileSync('./05/input.txt')
    .toString()
    .split('\n')
    .forEach((line) => {
      if (!line) return;
      if (!parsedData && line === END_DATA) {
        parsedData = true;
        return;
      }

      if (!parsedData) {
        const items = line.match(chunkExpr).map((item) => item.replace(itemExpr, ''));

        items.forEach((item, i) => {
          if (!item) return;

          if (!stacks[i]) {
            stacks[i] = [];
          }

          stacks[i].push(item);
        });
      } else {
        instructions.push(line.match(instructionExpr).map((n) => parseInt(n, 10)));
      }
    });

  return { stacks, instructions };
}
