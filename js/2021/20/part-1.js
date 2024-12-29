import { getInputElements, enhance } from './common.js';

export function part1({ lines }) {
  let { image, algo } = getInputElements(lines);
  let result = 0;

  const STEPS = 2;

  for (let step = 0; step < STEPS; step++) {
    const { enhanced, lit } = enhance(image, algo, step);

    image = enhanced;
    result = lit;
  }

  return result;
}
