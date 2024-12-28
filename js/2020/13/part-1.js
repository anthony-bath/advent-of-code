export function part1({ lines }) {
  const [timestampString, schedule] = lines;

  const buses = schedule
    .split(',')
    .filter((id) => id !== 'x')
    .map((id) => Number(id));

  const timestamp = Number(timestampString);

  const sorted = buses
    .map((id) => ({ id, wait: Math.ceil(timestamp / id) * id - timestamp }))
    .sort((a, b) => a.wait - b.wait);

  const { id, wait } = sorted.shift();

  return id * wait;
}
