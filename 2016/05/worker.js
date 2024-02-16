import { workerData, parentPort } from 'node:worker_threads';
import { createHash } from 'node:crypto';

const { data, start, end } = workerData;

const hashes = [];

for (let num = start; num < end; num++) {
  const hash = createHash('md5').update(`${data}${num}`).digest('hex');

  if (hash.startsWith('00000')) {
    hashes.push({ num, hash });
  }
}

parentPort.postMessage(hashes);
