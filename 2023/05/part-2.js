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

function getRanges({ min, max }, source) {
  const matchedRanges = maps[source].filter(
    (m) => (min >= m.min && min <= m.max) || (max >= m.min && max <= m.max)
  );

  const ranges = [];

  for (const sourceRange of matchedRanges) {
    const start = Math.max(min, sourceRange.min);
    const end = Math.min(max, sourceRange.max);

    ranges.push({ min: start + sourceRange.offset, max: end + sourceRange.offset });
  }

  if (ranges.length === 0) {
    return [{ min, max }];
  }

  ranges.sort((a, b) => a.min - b.min);

  if (max - min + 1 !== sumRanges(ranges)) {
    if (ranges[0].min > min) {
      ranges.push({ min, max: ranges[0].min - 1 });
    }

    if (ranges[ranges.length - 1].max < max) {
      ranges.push({ min: ranges[ranges.length - 1].max + 1, max });
    }
  }

  return ranges;
}

let locationRanges = [];

for (const range of seedRanges) {
  const soilRanges = getRanges(range, 'seed');
  const fertilizerRanges = soilRanges.map((r) => getRanges(r, 'soil')).flat();
  const waterRanges = fertilizerRanges.map((r) => getRanges(r, 'fertilizer')).flat();
  const lightRanges = waterRanges.map((r) => getRanges(r, 'water')).flat();
  const tempRanges = lightRanges.map((r) => getRanges(r, 'light')).flat();
  const humRanges = tempRanges.map((r) => getRanges(r, 'temperature')).flat();

  locationRanges = locationRanges.concat(humRanges.map((r) => getRanges(r, 'humidity')).flat());
}

write(YEAR, DAY, PART, locationRanges.sort((a, b) => a.min - b.min).shift().min);
