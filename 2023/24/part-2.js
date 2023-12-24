import { read, write } from '../../utilities/io.js';
import { init } from 'z3-solver';

const [YEAR, DAY, PART] = [2023, 24, 2];

const hailstones = read(YEAR, DAY, PART).map((line) => line.match(/-?\d+/g).map(Number));

async function solve() {
  const { Context } = await init();
  const { Solver, Real } = new Context('main');
  const solver = new Solver();

  let x = Real.const('x');
  let y = Real.const('y');
  let z = Real.const('z');
  let vx = Real.const('vx');
  let vy = Real.const('vy');
  let vz = Real.const('vz');

  const t = [0, 1, 2].map((i) => Real.const(`t${i}`));

  hailstones.slice(0, 3).forEach(([hx, hy, hz, hvx, hvy, hvz], i) => {
    solver.add(t[i].mul(hvx).add(hx).sub(x).sub(t[i].mul(vx)).eq(0));
    solver.add(t[i].mul(hvy).add(hy).sub(y).sub(t[i].mul(vy)).eq(0));
    solver.add(t[i].mul(hvz).add(hz).sub(z).sub(t[i].mul(vz)).eq(0));
  });

  const result = await solver.check();

  if (result !== 'sat') {
    throw new Error('Unsatisfiable');
  }

  return solver.model().eval(x.add(y).add(z)).value();
}

write(YEAR, DAY, PART, Number((await solve()).numerator));
process.exit(); //seems to be some issue with z3-solver keeping the process alive
