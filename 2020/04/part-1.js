import { readOld, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2020, 4, 1];

let validCount = 0;
let fields = [];

readOld(YEAR, DAY, PART).forEach((line) => {
  if (!line) {
    validCount +=
      fields.length === 8 || (fields.length === 7 && fields.indexOf('cid') === -1) ? 1 : 0;

    fields = [];
    return;
  }

  fields.push(...line.split(' ').map((pairs) => pairs.split(':')[0]));
});

write(YEAR, DAY, PART, validCount);
