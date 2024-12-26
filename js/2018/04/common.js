export function getEntries(lines) {
  const entries = [];

  lines.forEach((line) => {
    const timestamp = line.substring(1, 17);
    const [, time] = timestamp.split(' ');
    const [, minute] = time.split(':').map((n) => Number(n));

    let id = null;

    const eventData = line.substring(19);

    if (eventData.includes('Guard')) {
      id = eventData.match(/\d+/g)[0];
    }

    entries.push({ time: new Date(timestamp), minute, id });
  });

  entries.sort((a, b) => a.time - b.time);

  return entries;
}
