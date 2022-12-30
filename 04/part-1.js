import { read, write } from '../utility.js';

let validCount = 0;
let fields = [];

read(4).forEach((line) => {
  if (!line) {
    validCount +=
      fields.length === 8 || (fields.length === 7 && fields.indexOf('cid') === -1) ? 1 : 0;

    fields = [];
    return;
  }

  fields.push(...line.split(' ').map((pairs) => pairs.split(':')[0]));
});

write(4, 1, validCount);
