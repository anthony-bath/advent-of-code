import { read, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2015, 9, 1];

const expr = /(?<source>\w+) to (?<destination>\w+) = (?<distance>\d+)/;

const valueByName = new Map();
const connections = new Map();

read(YEAR, DAY, PART).forEach((line) => {
  const { source, destination, distance } = line.match(expr).groups;
  const connection = { location: destination, distance: Number(distance) };
  const reciprocalConnection = { location: source, distance: Number(distance) };

  if (!valueByName.has(source)) {
    const value = Math.pow(2, valueByName.size);
    valueByName.set(source, value);
    connections.set(value, [connection]);
  } else {
    const value = valueByName.get(source);
    connections.get(value).push(connection);
  }

  if (!valueByName.has(destination)) {
    const value = Math.pow(2, valueByName.size);
    valueByName.set(destination, value);
    connections.set(value, [reciprocalConnection]);
  } else {
    const value = valueByName.get(destination);
    connections.get(value).push(reciprocalConnection);
  }
});

for (const [source, list] of connections) {
  connections.set(
    source,
    list.map((connection) => ({ ...connection, location: valueByName.get(connection.location) }))
  );
}

const ALL = Math.pow(2, valueByName.size) - 1;

let longest = -Infinity;

for (const location of valueByName.values()) {
  const queue = [{ location, visited: location, distance: 0 }];

  while (queue.length) {
    const current = queue.shift();

    if (current.visited === ALL) {
      longest = Math.max(current.distance, longest);
      continue;
    }

    const usefulConnections = connections
      .get(current.location)
      .filter((connection) => !(current.visited & connection.location));

    for (const { location, distance } of usefulConnections) {
      queue.push({
        location,
        visited: current.visited | location,
        distance: current.distance + distance,
      });
    }
  }
}

write(YEAR, DAY, PART, longest);
