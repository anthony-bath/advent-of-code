import { execute } from '../IntCode_v2.js';

export function part1({ data }) {
  const program = data.split(',').map(Number);

  let count = 0;

  for (let x = 0; x < 50; x++) {
    for (let y = 0; y < 50; y++) {
      const result = execute({ pointer: 0, program: [...program], relativeBase: 0 }, [x, y]);

      if (result === 1) count++;
    }
  }

  return count;
}
