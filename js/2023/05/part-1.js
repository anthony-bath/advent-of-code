export function part1({ lines }) {
  const seeds = lines[0].match(/\d+/g).map((n) => Number(n));

  const mapLabel = /(?<source>\w+)-to-(?<destination>\w+)/;
  const maps = {};
  let currentSource;
  let currentDestination;

  for (const line of lines.slice(2)) {
    if (!line) continue;

    const label = line.match(mapLabel);

    if (label) {
      const { source, destination } = label.groups;
      currentSource = source;
      currentDestination = destination;

      maps[currentSource] = [];
    } else {
      const [drs, srs, len] = line.match(/\d+/g).map((n) => Number(n));

      maps[currentSource].push({
        min: srs,
        max: srs + len - 1,
        [currentDestination]: {
          min: drs,
          max: drs + len,
        },
      });
    }
  }

  function getMappedTo(map) {
    return Object.keys(map)
      .filter((k) => !['min', 'max'].includes(k))
      .pop();
  }

  function find(source, destination, value) {
    const sourceMaps = maps[source];
    const mappedTo = getMappedTo(sourceMaps[0]);

    let targetMap = sourceMaps.find((m) => value >= m.min && value <= m.max);
    let destinationValue;

    if (!targetMap) {
      destinationValue = value;
    } else {
      const diff = value - targetMap.min;
      destinationValue = targetMap[mappedTo].min + diff;
    }

    if (mappedTo !== destination) {
      return find(mappedTo, destination, destinationValue);
    } else {
      return destinationValue;
    }
  }

  return seeds
    .map((seed) => find('seed', 'location', seed))
    .sort((a, b) => a - b)
    .shift();
}
