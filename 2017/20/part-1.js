export function part1({ lines }) {
  const particles = lines.map((line, id) => {
    const [px, py, pz, vx, vy, vz, ax, ay, az] = line.match(/-?\d+/g).map((n) => Number(n));
    return { px, py, pz, vx, vy, vz, ax, ay, az, id };
  });

  let closestParticle = null;
  let ticksClosest;

  while (true) {
    particles.forEach((particle) => {
      particle.vx += particle.ax;
      particle.vy += particle.ay;
      particle.vz += particle.az;
      particle.px += particle.vx;
      particle.py += particle.vy;
      particle.pz += particle.vz;
      particle.distance = Math.abs(particle.px) + Math.abs(particle.py) + Math.abs(particle.pz);
    });

    particles.sort((a, b) => a.distance - b.distance);

    if (closestParticle !== particles[0].id) {
      closestParticle = particles[0].id;
      ticksClosest = 1;
    } else {
      ticksClosest++;
    }

    if (ticksClosest >= 1000) {
      break;
    }
  }

  return closestParticle;
}
