import { read, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2022, 16, 2];

const expr =
  /Valve (?<name>[A-Z]{2}) has flow rate=(?<flowRate>\d+); tunnels? leads? to valves? (?<connections>[A-Z,\s]+)/;

const valves = read(YEAR, DAY, PART).map((line) => {
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

function dfs(state, openedValves) {
  if (state.minutes <= 0 || openedValves.length === valvesWithFlow.length) {
    return state.flow;
  }

  const possibleValves = valvesWithFlow
    .filter(
      ({ name }) =>
        !openedValves.includes(name) && state.minutes > distance[state.valve.name][name] + 1
    )
    .map(({ name }) => valvesByName.get(name));

  if (possibleValves.length === 0) {
    return state.flow;
  }

  let best = 0;
  possibleValves.forEach((valve) => {
    const travelTime = distance[state.valve.name][valve.name];
    const result = dfs(
      {
        valve,
        minutes: state.minutes - travelTime - 1,
        flow: state.flow + (state.minutes - travelTime - 1) * valve.flowRate,
      },
      [...openedValves, valve.name]
    );

    if (result > best) {
      best = result;
    }
  });

  return best;
}

let combinations = [];

function getCombinations(size, s, a) {
  for (let i = s; i < valvesWithFlow.length; i++) {
    if (!size) {
      const b = a.slice(0);
      b.push(valvesWithFlow[i].name);
      combinations.push(b);
    } else {
      a.push(valvesWithFlow[i].name);
      getCombinations(size - 1, i + 1, a);
      a.splice(-1, 1);
    }
  }
}

// Generate all possible sets of open valves with flowRate > 0 and the complement set
// Can then iterate over each pair of opened valve sets doing DFS on each with each
// set representing either us or the Elephant. All credit goes to hyper-neutrino on
// YouTube for the idea.
const openValvePairs = [];

for (let size = 0; size < valvesWithFlow.length - 1; size++) {
  combinations = [];
  getCombinations(size, 0, []);

  combinations.forEach((set) => {
    openValvePairs.push([
      set,
      valvesWithFlow.filter(({ name }) => !set.includes(name)).map(({ name }) => name),
    ]);
  });
}

let best = 0;
for (const [ourOpenValves, elephantOpenValves] of openValvePairs) {
  const inititalState = {
    minutes: 26,
    valve: valvesByName.get('AA'),
    flow: 0,
  };

  best = Math.max(best, dfs(inititalState, ourOpenValves) + dfs(inititalState, elephantOpenValves));
}

write(YEAR, DAY, PART, best);
