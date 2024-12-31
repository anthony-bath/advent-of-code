import { hash } from './common.js';

export function part1({ data }) {
  return data.split(',').reduce((total, part) => total + hash(part), 0);
}
