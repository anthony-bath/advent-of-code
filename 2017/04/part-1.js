import { readOld, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2017, 4, 1];

let validCount = 0;

readOld(YEAR, DAY, PART).forEach((passphrase) => {
  const words = passphrase.split(' ');

  const lookup = {};
  let isValid = true;

  for (const word of words) {
    if (!lookup[word]) {
      lookup[word] = 1;
    } else {
      isValid = false;
      break;
    }
  }

  if (isValid) {
    validCount++;
  }
});

write(YEAR, DAY, PART, validCount);
