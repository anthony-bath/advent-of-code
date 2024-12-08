import { Worker } from 'node:worker_threads';

export async function part2({ data }) {
  const size = 2.5e6;
  const criteria = '000000';
  const workers = [0, 1, 2, 3].map(
    (i) =>
      new Promise((resolve) => {
        const worker = new Worker('./js/2015/04/worker.js', {
          workerData: {
            start: i * size,
            end: (i + 1) * size,
            data,
            criteria,
          },
        });

        worker.on('message', (message) => {
          if (message !== null) {
            resolve(message);
          }
        });
      })
  );

  return await Promise.any(workers);
}
