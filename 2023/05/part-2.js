import { read, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2023, 5, 2];

const lines = read(YEAR, DAY, PART);

const seedData = lines[0].match(/\d+/g).map((n) => Number(n));
const seedRanges = [];

for (let i = 1; i < seedData.length; i += 2) {
  seedRanges.push({ min: seedData[i - 1], max: seedData[i - 1] + seedData[i] - 1 });
}

const mapLabel = /(?<source>\w+)-to-(?<destination>\w+)/;
const maps = {};
let currentSource;

for (const line of lines.slice(2)) {
  if (!line) continue;

  const label = line.match(mapLabel);

  if (label) {
    const { source } = label.groups;
    currentSource = source;

    maps[currentSource] = [];
  } else {
    const [drs, srs, len] = line.match(/\d+/g).map((n) => Number(n));

    maps[currentSource].push({
      min: srs,
      max: srs + len - 1,
      offset: drs - srs,
    });
  }
}

const path = ['seed', 'soil', 'fertilizer', 'water', 'light', 'temperature', 'humidity'];

function getRanges(ranges, index) {
  const sourceMaps = maps[path[index]];
  const mappedRanges = [];

  for (const { min, max } of ranges) {
    const intersects = [];

    for (const map of sourceMaps) {
      if (min >= map.min && max <= map.max) {
        intersects.push(map);
      } else if (min >= map.min && min <= map.max && max > map.max) {
        intersects.push({ ...map, high: true });
      } else if (min < map.min && max >= map.min && max <= map.max) {
        intersects.push({ ...map, low: true });
      }
    }

    if (intersects.length === 0) {
      mappedRanges.push({ min, max });
      continue;
    }

    const newRanges = [];

    for (const intersect of intersects) {
      if (intersect.high) {
        newRanges.push({ min: min + intersect.offset, max: intersect.max + intersect.offset });

        if (intersects.length === 1) {
          newRanges.push({ min: intersect.max + 1, max });
        }
      } else if (intersect.low) {
        newRanges.push({ min: intersect.min + intersect.offset, max: max + intersect.offset });

        if (intersects.length === 1) {
          newRanges.push({ min: min, max: intersect.min - 1 });
        }
      } else {
        newRanges.push({ min: min + intersect.offset, max: max + intersect.offset });
      }
    }

    mappedRanges.push(...newRanges);
  }

  if (index === path.length - 1) {
    return mappedRanges;
  }

  return getRanges(mappedRanges, index + 1);
}

write(
  YEAR,
  DAY,
  PART,
  getRanges(seedRanges, 0)
    .sort((a, b) => a.min - b.min)
    .shift().min
);
