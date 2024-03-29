export function part2({ lines }) {
  let particles = lines.map((line, id) => {
    const [px, py, pz, vx, vy, vz, ax, ay, az] = line.match(/-?\d+/g).map((n) => Number(n));
    return { px, py, pz, vx, vy, vz, ax, ay, az, id };
  });

  let ticksWithoutCollision = 0;

  while (true) {
    const positions = {};

    particles.forEach((particle) => {
      particle.vx += particle.ax;
      particle.vy += particle.ay;
      particle.vz += particle.az;
      particle.px += particle.vx;
      particle.py += particle.vy;
      particle.pz += particle.vz;

      const key = `${particle.px}|${particle.py}|${particle.pz}`;

      if (key in positions) {
        positions[key]++;
      } else {
        positions[key] = 1;
      }
    });

    const collided = [];

    particles.forEach(({ px, py, pz, id }) => {
      const key = `${px}|${py}|${pz}`;

      if (positions[key] > 1) {
        collided.push(id);
      }
    });

    if (collided.length === 0) {
      ticksWithoutCollision++;

      if (ticksWithoutCollision >= 10) {
        break;
      }
    } else {
      ticksWithoutCollision = 0;
      particles = particles.filter(({ id }) => !collided.includes(id));
    }
  }

  return particles.length;
}
