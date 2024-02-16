import { createHash } from 'node:crypto';
import { workerData, parentPort } from 'node:worker_threads';

const { start, end, data, criteria } = workerData;

for (let num = start; num < end; num++) {
  const value = createHash('md5').update(`${data}${num}`).digest('hex');

  if (value.startsWith(criteria)) {
    parentPort.postMessage(num);
    process.exit();
  }
}

process.exit();
