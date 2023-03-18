import { read, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2017, 10, 1];

const config = { splitBy: ',' };
const lengths = read(YEAR, DAY, PART, config).map((n) => Number(n));
const SIZE = config.test ? 5 : 256;
let list = Array(SIZE)
  .fill()
  .map((_, i) => i);

let position = 0;
let skipSize = 0;

for (const length of lengths) {
  let newList;

  if (position + length >= list.length) {
    const remainder = position + length - list.length;
    const sublist = [...list.splice(position), ...list.splice(0, remainder)];

    sublist.reverse();

    newList = [...sublist.splice(sublist.length - remainder), ...list, ...sublist];
  } else {
    const front = list.slice(0, position);
    const sublist = list.slice(position, position + length);
    const back = list.slice(position + length);

    sublist.reverse();

    newList = [...front, ...sublist, ...back];
  }

  list = newList;
  position = (position + length + skipSize) % SIZE;
  skipSize++;
}

write(YEAR, DAY, PART, list.shift() * list.shift());
