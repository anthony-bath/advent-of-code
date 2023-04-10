import { read, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2021, 19, 1];

class RelativePoint3D {
  constructor(a, b, c) {
    this.a = a;
    this.b = b;
    this.c = c;
  }

  distance(other) {
    return Math.sqrt(
      Math.pow(Math.abs(other.a - this.a), 2) +
        Math.pow(Math.abs(other.b - this.b), 2) +
        Math.pow(Math.abs(other.c - this.c), 2)
    );
  }
}

class Scanner {
  constructor(id) {
    this.relativeBeacons = [];
    this.distancePairs = [];
  }
}

const scanners = [];
let currentScanner;

read(YEAR, DAY, PART).forEach((line) => {
  if (!line) return;

  if (line.startsWith('---')) {
    currentScanner = new Scanner(Number(line.match(/\d+/)));
    scanners.push(currentScanner);
  } else {
    const [a, b, c] = line.match(/-?\d+/g).map((n) => Number(n));
    currentScanner.relativeBeacons.push(new RelativePoint3D(a, b, c));
  }
});

for (const scanner of scanners) {
  for (let i = 0; i < scanner.relativeBeacons.length; i++) {
    for (let j = i + 1; j < scanner.relativeBeacons.length; j++) {
      const b1 = scanner.relativeBeacons[i];
      const b2 = scanner.relativeBeacons[j];

      scanner.distancePairs.push(b1.distance(b2));
    }
  }
}

for (const scanner of scanners) {
  for (let i = 0; i < scanner.relativeBeacons.length; i++) {
    const matched = [];

    for (let j = i + 1; j < scanner.relativeBeacons.length; j++) {
      const b1 = scanner.relativeBeacons[i];
      const b2 = scanner.relativeBeacons[j];

      scanner.distancePairs.push(b1.distance(b2));
    }
  }
}

write(YEAR, DAY, PART, '');
