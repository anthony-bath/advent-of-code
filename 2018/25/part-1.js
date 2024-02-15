const { abs } = Math;

export function part1({ lines }) {
  const points = lines.map((line) => new Point4D(line.match(/-?\d+/g).map(Number)));
  const used = new Set();
  const constellations = [];

  for (let i = 0; i < points.length; i++) {
    if (i in used) continue;

    const groupedPoints = [points[i]];
    used[i] = 1;

    while (true) {
      let changes = false;

      for (let j = 0; j < points.length; j++) {
        if (j in used) continue;

        if (groupedPoints.some((point) => point.distance(points[j]) <= 3)) {
          used[j] = 1;
          groupedPoints.push(points[j]);
          changes = true;
        }
      }

      if (!changes) break;
    }

    constellations.push(groupedPoints);
  }

  return constellations.length;
}

class Point4D {
  constructor([x, y, z, w]) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;

    this.points = [x, y, z, w];
  }

  distance(other) {
    return this.points.reduce(
      (distance, point, i) => distance + Math.abs(point - other.points[i]),
      0
    );
  }
}
