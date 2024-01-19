import { getInputElements } from './common.js';

export function part1({ lines }) {
  const fish = getInputElements(lines);
  return fish.reduce((result, f) => result.add(f)).magnitude();
}
