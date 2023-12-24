import { read, write } from '../../utilities/io.js';
import { init } from 'z3-solver';

const [YEAR, DAY, PART] = [2023, 24, 2];

const hailstones = read(YEAR, DAY, PART).map((line) => {
  return line.match(/-?\d+/g).map(Number);
});

const {
  Z3, // Low-level C-like API
  Context, // High-level Z3Py-like API
} = await init();

const { Solver, Int } = new Context('main');

const solver = new Solver();
let x = Int.const('x');
let y = Int.const('y');
let z = Int.const('z');
let vx = Int.const('vx');
let vy = Int.const('vy');
let vz = Int.const('vz');

const t = [0, 1, 2].map((i) => Int.const(`f't${i}`));

const [hs1x, hs1y, hs1z, hs1vx, hs1vy, hs1vz] = hailstones[0];
const [hs2x, hs2y, hs2z, hs2vx, hs2vy, hs2vz] = hailstones[1];
const [hs3x, hs3y, hs3z, hs3vx, hs3vy, hs3vz] = hailstones[2];

solver.add(x + t[0] * vx - hs1x - t[0] * hs1vx == 0);
solver.add(y + t[0] * vy - hs1y - t[0] * hs1vy == 0);
solver.add(z + t[0] * vz - hs1z - t[0] * hs1vz == 0);

solver.add(x + t[1] * vx - hs2x - t[1] * hs2vx == 0);
solver.add(y + t[1] * vy - hs2y - t[1] * hs2vy == 0);
solver.add(z + t[1] * vz - hs2z - t[1] * hs2vz == 0);

solver.add(x + t[2] * vx - hs3x - t[2] * hs3vx == 0);
solver.add(y + t[2] * vy - hs3y - t[2] * hs3vy == 0);
solver.add(z + t[2] * vz - hs3z - t[2] * hs3vz == 0);

const result = await solver.check();
console.log(result);

write(YEAR, DAY, PART, '');
