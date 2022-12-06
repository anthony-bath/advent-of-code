import fs from 'fs';

const data = fs.readFileSync('./06/input.txt', 'utf-8').split('');
const MARKER_SIZE = 14;
let markerStart;

for (let i = 0; i < data.length; i++) {
  if (new Set([...data.slice(i, i + MARKER_SIZE)]).size === MARKER_SIZE) {
    markerStart = i + MARKER_SIZE;
    break;
  }
}

fs.writeFileSync('./06/output-2.txt', `${markerStart}`);
