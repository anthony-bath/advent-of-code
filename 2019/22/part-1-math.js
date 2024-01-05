import { readOld, write } from '../../utilities/io.js';
import { modInv, modPow } from 'bigint-crypto-utils';

// Following along with tutorial at https://codeforces.com/blog/entry/72593

const [YEAR, DAY, PART] = [2019, 22, 1];

const lcfs = readOld(YEAR, DAY, PART).map((line) => {
  if (line.startsWith('deal with')) {
    return [BigInt(Number(line.match(/-?\d+/))), 0n];
  } else if (line.startsWith('deal into')) {
    return [-1n, -1n];
  } else {
    return [1n, BigInt(-1 * Number(line.match(/-?\d+/)))];
  }
});

const DECK_SIZE = 10007n;
const SHUFFLES = 1n;

function composeLCFs(lcfs) {
  let [a, b] = lcfs[0];

  for (let i = 1; i < lcfs.length; i++) {
    const [c, d] = lcfs[i];
    [a, b] = [(a * c) % DECK_SIZE, (b * c + d) % DECK_SIZE];
  }

  return [a, b];
}

let [a, b] = composeLCFs(lcfs);
const aK = modPow(a, SHUFFLES, DECK_SIZE);
const result =
  ((aK * 2019n) % DECK_SIZE) + ((b * (1n - aK) * modInv(1n - a, DECK_SIZE)) % DECK_SIZE);

write(YEAR, DAY, PART, result);
