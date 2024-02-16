import { Worker } from 'node:worker_threads';

export async function part1({ data }) {
  const size = 2.6 * 1e6;

  const workers = [0, 1, 2, 3].map(
    (i) =>
      new Promise((resolve) => {
        const worker = new Worker('./2016/05/worker.js', {
          workerData: { data, start: i * size, end: (i + 1) * size },
        });

        worker.on('message', resolve);
      })
  );

  const hashes = (await Promise.all(workers)).flat();

  return hashes
    .sort((a, b) => a.num - b.num)
    .slice(0, 8)
    .map(({ hash }) => hash[5])
    .join('');
}
