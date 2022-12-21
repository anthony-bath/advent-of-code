import { read, write } from '../utility.js';

const expr =
  /Valve (?<name>[A-Z]{2}) has flow rate=(?<flowRate>\d+); tunnels? leads? to valves? (?<connections>[A-Z,\s]+)/;

const valves = read(16).map((line) => {
  const { name, flowRate, connections } = line.match(expr).groups;
  return {
    name,
    flowRate: Number(flowRate),
    connections: connections.split(', '),
  };
});

const distance = {};
const valvesByName = new Map();
const valvesWithFlow = valves.filter(({ flowRate }) => flowRate > 0);

valves.forEach((valve) => {
  const { name, connections } = valve;
  valvesByName.set(name, valve);

  distance[name] = {};

  valves.forEach((targetValve) => {
    if (targetValve.name === name) {
      distance[name][name] = 0;
    } else {
      distance[name][targetValve.name] = Infinity;
    }
  });

  connections.forEach((connection) => {
    distance[name][connection] = 1;
  });
});

//Floyd - Warshall
for (let k = 0; k < valves.length; k++) {
  for (let i = 0; i < valves.length; i++) {
    for (let j = 0; j < valves.length; j++) {
      const vi = valves[i].name;
      const vj = valves[j].name;
      const vk = valves[k].name;

      if (distance[vi][vj] > distance[vi][vk] + distance[vk][vj]) {
        distance[vi][vj] = distance[vi][vk] + distance[vk][vj];
      }
    }
  }
}

function dfs(state) {
  if (
    state.minutes <= 0 ||
    state.openedValves.length === valvesWithFlow.length
  ) {
    return state.flow;
  }

  const possibleValves = valvesWithFlow
    .filter(
      ({ name }) =>
        !state.openedValves.includes(name) &&
        name !== state.valve.name &&
        state.minutes > distance[state.valve.name][name] + 1
    )
    .map(({ name }) => valvesByName.get(name));

  if (possibleValves.length === 0) {
    return state.flow;
  }

  let best = 0;
  possibleValves.forEach((valve) => {
    const travelTime = distance[state.valve.name][valve.name];
    const result = dfs({
      valve,
      minutes: state.minutes - travelTime - 1,
      openedValves: [...state.openedValves, valve.name],
      flow: state.flow + (state.minutes - travelTime - 1) * valve.flowRate,
    });

    if (result > best) {
      best = result;
    }
  });

  return best;
}

const inititalState = {
  minutes: 30,
  valve: valvesByName.get('AA'),
  openedValves: [],
  flow: 0,
};

write(16, 1, `${dfs(inititalState)}`);
