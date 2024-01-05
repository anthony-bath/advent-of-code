export function part1(data) {
  const reindeers = [];

  data.split('\n').forEach((line) => {
    const [name] = line.split(' ');
    const [speed, travelTime, restTime] = line.match(/\d+/g).map((n) => Number(n));

    reindeers.push(new Reindeer(name, speed, travelTime, restTime));
  });

  return Math.max(...reindeers.map((reindeer) => reindeer.distanceTraveled(2503)));
}

class Reindeer {
  constructor(name, speed, travelTime, restTime) {
    this.name = name;
    this.speed = speed;
    this.travelTime = travelTime;
    this.restTime = restTime;
    this.cycleTime = travelTime + restTime;
  }

  distanceTraveled(time) {
    const completeCycles = Math.floor(time / this.cycleTime);
    const remainingTime = time % this.cycleTime;

    return (
      completeCycles * this.travelTime * this.speed +
      Math.min(this.travelTime, remainingTime) * this.speed
    );
  }
}
