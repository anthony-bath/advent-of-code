import { Worker } from 'node:worker_threads';

export async function part2({ data }) {
  const size = 6.92 * 1e6;

  const workers = [0, 1, 2, 3].map(
    (i) =>
      new Promise((resolve) => {
        const worker = new Worker('./js/2016/05/worker.js', {
          workerData: { data, start: i * size, end: (i + 1) * size },
        });

        worker.on('message', resolve);
      })
  );

  const hashes = (await Promise.all(workers)).flat();
  const passwordChars = new Map();
  const positions = [...Array(8).keys()];

  for (const { hash } of hashes) {
    const position = Number(hash[5]);

    if (
      Number.isInteger(position) &&
      positions.includes(position) &&
      !passwordChars.has(position)
    ) {
      passwordChars.set(position, hash[6]);
    }
  }

  return positions.map((position) => passwordChars.get(position)).join('');
}
