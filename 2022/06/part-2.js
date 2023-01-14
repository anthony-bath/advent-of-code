import { read, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2022, 6, 2];

const data = read(YEAR, DAY, PART, { splitBy: '' });

const marker = new Map();
const TARGET_SIZE = 14;
let markerStart;

for (let i = 0; i < data.length; i++) {
  const nextCount = (marker.get(data[i]) || 0) + 1;
  marker.set(data[i], nextCount);

  if (i - TARGET_SIZE >= 0) {
    const prevCount = marker.get(data[i - TARGET_SIZE]) - 1;

    if (prevCount <= 0) {
      marker.delete(data[i - TARGET_SIZE]);
    } else {
      marker.set(data[i - TARGET_SIZE], prevCount);
    }
  }

  if (marker.size === TARGET_SIZE) {
    markerStart = i + 1;
    break;
  }
}

write(YEAR, DAY, PART, markerStart);

/*
Original implementation, less performant

const MARKER_SIZE = 14;
let markerStart;

for (let i = 0; i < data.length; i++) {
  if (new Set(data.slice(i, i + MARKER_SIZE)).size === MARKER_SIZE) {
    markerStart = i + MARKER_SIZE;
    break;
  }
}*/
