export function part2(data) {
  const reindeers = new Map();

  data.split('\n').forEach((line) => {
    const [name] = line.split(' ');
    const [speed, travelTime, restTime] = line.match(/\d+/g).map((n) => Number(n));

    reindeers.set(name, new Reindeer(name, speed, travelTime, restTime));
  });

  for (let time = 1; time <= 2503; time++) {
    const distanceData = [...reindeers.values()].map((reindeer) => ({
      name: reindeer.name,
      distance: reindeer.distanceTraveled(time),
    }));

    distanceData.sort((a, b) => b.distance - a.distance);
    reindeers.get(distanceData[0].name).score();

    for (let i = 1; i < distanceData.length; i++) {
      if (distanceData[i].distance === distanceData[0].distance) {
        reindeers.get(distanceData[i].name).score();
      } else {
        break;
      }
    }
  }

  return [...reindeers.values()].sort((a, b) => b.points - a.points).shift().points;
}

class Reindeer {
  constructor(name, speed, travelTime, restTime) {
    this.name = name;
    this.speed = speed;
    this.travelTime = travelTime;
    this.restTime = restTime;
    this.points = 0;
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

  score() {
    this.points++;
  }
}
