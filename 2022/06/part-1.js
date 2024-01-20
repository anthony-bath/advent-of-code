export function part1({ data }) {
  const markerData = data.split('');
  const marker = new Map();
  const TARGET_SIZE = 4;
  let markerStart;

  for (let i = 0; i < markerData.length; i++) {
    const nextCount = (marker.get(markerData[i]) || 0) + 1;
    marker.set(markerData[i], nextCount);

    if (i - TARGET_SIZE >= 0) {
      const prevCount = marker.get(markerData[i - TARGET_SIZE]) - 1;

      if (prevCount <= 0) {
        marker.delete(markerData[i - TARGET_SIZE]);
      } else {
        marker.set(markerData[i - TARGET_SIZE], prevCount);
      }
    }

    if (marker.size === TARGET_SIZE) {
      markerStart = i + 1;
      break;
    }
  }

  return markerStart;
}

/*
Original implementation, less performant

const MARKER_SIZE = 4;
let markerStart;

for (let i = 0; i < data.length; i++) {
  if (new Set(data.slice(i, i + MARKER_SIZE)).size === MARKER_SIZE) {
    markerStart = i + MARKER_SIZE;
    break;
  }
}*/
