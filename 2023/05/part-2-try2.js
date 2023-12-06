import { read, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2023, 5, 2];

const lines = read(YEAR, DAY, PART);

const seedData = lines[0].match(/\d+/g).map((n) => Number(n));
const seedRanges = [];

for (let i = 1; i < seedData.length; i += 2) {
  seedRanges.push({ min: seedData[i - 1], max: seedData[i - 1] + seedData[i] - 1 });
}

seedRanges.sort((a, b) => a.min - b.min);

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
      offset: drs - srs,
    });
  }
}

for (const key of Object.keys(maps)) {
  maps[key].sort((a, b) => a.min - b.min);
}

function sumRanges(ranges) {
  return ranges.reduce((sum, range) => sum + (range.max - range.min + 1), 0);
}

const path = ['seed', 'soil', 'fertilizer', 'water', 'light', 'temperature', 'humidity'];

function getRanges(ranges, index) {
  const sourceMaps = maps[path[index]];
  const mappedRanges = [];

  if (index === 4) {
    debugger;
  }

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

    for (const range of intersects) {
      if (range.high) {
        newRanges.push({ min: min + range.offset, max: range.max + range.offset });
        newRanges.push({ min: range.max + 1, max });
      } else if (range.low) {
        newRanges.push({ min: range.min + range.offset, max: max + range.offset });
        newRanges.push({ min: min, max: range.min - 1 });
      } else {
        newRanges.push({ min: min + range.offset, max: max + range.offset });
      }
    }

    mappedRanges.push(...newRanges);
  }

  mappedRanges.sort((a, b) => a.min - b.min);

  if (index === path.length - 1) {
    return mappedRanges;
  }

  return getRanges(mappedRanges, index + 1);
}

console.log(
  getRanges(seedRanges, 0)
    .sort((a, b) => a.min - b.min)
    .shift().min
);
