import { Point, Line } from './common.js';

export function part2({ lines }) {
  const stationToAsteroidsLines = [];
  const station = new Point(17, 22); // Part 1 Solution

  lines.forEach((line, y) =>
    line.split('').forEach((cell, x) => {
      if (x === station.x && y === station.y) return;
      if (cell === '#') {
        stationToAsteroidsLines.push(new Line(station, new Point(x, y)));
      }
    })
  );

  function sortAsteroids(a, b) {
    if (a.m > b.m) {
      return 1;
    } else if (a.m < b.m) {
      return -1;
    }

    return a.length - b.length;
  }

  // Sort Asteroids starting from 90 deg rotating clockwise
  const sorted = [];

  const sortingLambdas = [
    (line) => line.vertical && line.p2.y < station.y,
    (line) => line.p2.y < station.y && line.p2.x > station.x,
    (line) => line.p2.x > station.x && line.p2.y === station.y,
    (line) => line.p2.y > station.y && line.p2.x > station.x,
    (line) => line.vertical && line.p2.y > station.y,
    (line) => line.p2.y > station.y && line.p2.x < station.x,
    (line) => line.p2.x < station.x && line.p2.y === station.y,
    (line) => line.p2.y < station.y && line.p2.x < station.x,
  ];

  sortingLambdas.forEach((lambda) =>
    sorted.push(...stationToAsteroidsLines.filter(lambda).sort(sortAsteroids))
  );

  const blasted = [];
  let index = 0;

  while (blasted.length < 200) {
    const [line] = sorted.splice(index, 1);
    blasted.push(line.p2);

    while (sorted[index].m === line.m) {
      index++;
    }

    if (index >= sorted.length) {
      index = 0;
    }
  }

  const { x, y } = blasted.pop();

  return x * 100 + y;
}
