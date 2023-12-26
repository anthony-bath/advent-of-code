import { read, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2023, 25, 1];

const graph = new Map();

read(YEAR, DAY, PART).forEach((line) => {
  const [source, ...connections] = line.replace(':', '').split(' ');

  if (!graph.has(source)) {
    graph.set(source, connections);
  } else {
    graph.set(source, [...graph.get(source), ...connections]);
  }

  connections.forEach((connection) => {
    if (!graph.has(connection)) {
      graph.set(connection, [source]);
    } else {
      graph.get(connection).push(source);
    }
  });
});

function removeConnection(graph, source, target) {
  graph.set(
    source,
    graph.get(source).filter((node) => node !== target)
  );
  graph.set(
    target,
    graph.get(target).filter((node) => node !== source)
  );
}

// Identified cut nodes with GraphViz
removeConnection(graph, 'nrs', 'khn');
removeConnection(graph, 'ssd', 'xqh');
removeConnection(graph, 'qlc', 'mqb');

function traverse(graph, source, visited = new Set()) {
  visited.add(source);

  for (const target of graph.get(source)) {
    if (!visited.has(target)) {
      traverse(graph, target, visited);
    }
  }

  return visited;
}

const oneClusterSize = traverse(graph, graph.keys().next().value).size;
const result = oneClusterSize * (graph.size - oneClusterSize);

write(YEAR, DAY, PART, result);
