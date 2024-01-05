import { readOld } from '../../utilities/io.js';

export function loadScannersWithOverlapsCalculated(year, day, part) {
  const scanners = [];
  let currentScanner;

  readOld(year, day, part).forEach((line) => {
    if (!line) return;

    if (line.startsWith('---')) {
      currentScanner = new Scanner(Number(line.match(/\d+/)));
      scanners.push(currentScanner);
    } else {
      const [x, y, z] = line.match(/-?\d+/g).map((n) => Number(n));
      currentScanner.relativeBeacons.push(new Beacon(x, y, z));
    }
  });

  for (const scanner of scanners) {
    for (let i = 0; i < scanner.relativeBeacons.length; i++) {
      for (let j = i + 1; j < scanner.relativeBeacons.length; j++) {
        const b1 = scanner.relativeBeacons[i];
        const b2 = scanner.relativeBeacons[j];

        scanner.beaconDistances.push({ from: b1.id, to: b2.id, distance: b1.distance(b2) });
      }
    }
  }

  for (let i = 0; i < scanners.length; i++) {
    for (let j = 0; j < scanners.length; j++) {
      if (j === i) continue;

      const matched = new Set();

      const distances1 = scanners[i].beaconDistances;
      const distances2 = scanners[j].beaconDistances;

      for (const distance of distances1) {
        const matching = distances2.find((d) => d.distance === distance.distance);

        if (matching) {
          matched.add(distance.from);
          matched.add(distance.to);
        }
      }

      if (matched.size >= 12) {
        scanners[i].matchedDistances[j] = matched;
      }
    }
  }

  return scanners;
}

export function rotations({ x, y, z }, index) {
  const all = [
    { x, y, z },
    { x, y: z, z: -y },
    { x, y: -y, z: -z },
    { x, y: -z, z: y },
    { x: -x, y: -y, z },
    { x: -x, y: z, z: y },
    { x: -x, y, z: -z },
    { x: -x, y: -z, z: -y },
    { x: y, y: z, z: x },
    { x: y, y: x, z: -z },
    { x: y, y: -z, z: -x },
    { x: y, y: -x, z },
    { x: -y, y: -z, z: x },
    { x: -y, y: x, z },
    { x: -y, y: z, z: -x },
    { x: -y, y: -x, z: -z },
    { x: z, y: x, z: y },
    { x: z, y, z: -x },
    { x: z, y: -x, z: -y },
    { x: z, y: -y, z: x },
    { x: -z, y: -x, z: y },
    { x: -z, y, z: x },
    { x: -z, y: x, z: -y },
    { x: -z, y: -y, z: -x },
  ];

  if (index !== undefined) {
    return all[index];
  }

  return all;
}

class Beacon {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.id = `${x}|${y}|${z}`;
  }

  distance(other) {
    return Math.sqrt(
      Math.pow(Math.abs(other.x - this.x), 2) +
        Math.pow(Math.abs(other.y - this.y), 2) +
        Math.pow(Math.abs(other.z - this.z), 2)
    );
  }
}

class Scanner {
  constructor(id) {
    this.id = id;
    this.relativeBeacons = [];
    this.beaconDistances = [];
    this.matchedDistances = {};
    this.location = { x: 0, y: 0, z: 0 };
  }
}

export class Transformation {
  constructor(x, y, z, r) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.r = r;
  }

  apply(point) {
    const rotated = rotations(point, this.r);
    return { x: rotated.x + this.x, y: rotated.y + this.y, z: rotated.z + this.z };
  }
}
