import { abs } from '../../utilities/math.js';

export function getJumpInstruction(index, value) {
  if (index === 0) {
    return index - 1;
  }

  if (index > 0) {
    return index + value - 1;
  }

  return index - (abs(value) + 1);
}
