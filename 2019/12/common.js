export class Moon {
  constructor(position) {
    this.position = position;
    this.velocity = [0, 0, 0];
  }

  applyGravity(moon) {
    for (const [i, _] of this.position.entries()) {
      if (this.position[i] > moon.position[i]) {
        this.velocity[i] -= 1;
        moon.velocity[i] += 1;
      } else if (moon.position[i] > this.position[i]) {
        this.velocity[i] += 1;
        moon.velocity[i] -= 1;
      }
    }
  }

  applyVelocity() {
    for (const [i, velocity] of this.velocity.entries()) {
      this.position[i] += velocity;
    }
  }

  energy() {
    return sum(this.position) * sum(this.velocity);
  }

  key() {
    return `${this.position.join('|')}-${this.velocity.join('|')}`;
  }
}

export function sum(array) {
  return array.reduce((sum, current) => sum + Math.abs(current), 0);
}
