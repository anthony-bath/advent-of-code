import { read, write } from '../utility.js';

const data = read(6, '');

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

write(6, 2, `${markerStart}`);

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
