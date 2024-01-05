import { sum } from '../../utilities/array.js';
import { readOld, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2018, 8, 1];

const input = readOld(YEAR, DAY, PART, { splitBy: ' ' }).map((n) => Number(n));

const metadata = [];

function getMetadata(data) {
  const [children, metadataCount] = data.splice(0, 2);

  if (children > 0) {
    for (let i = 0; i < children; i++) {
      getMetadata(data);
    }
  }

  metadata.push(...data.splice(0, metadataCount));
}

getMetadata(input);

write(YEAR, DAY, PART, sum(metadata));
