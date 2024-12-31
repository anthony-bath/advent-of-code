export const DIR = {
  LEFT: 0,
  UP: 1,
  RIGHT: 2,
  DOWN: 3,
};

export function evaluate(options, grid) {
  const W = grid[0].length;
  const H = grid.length;

  function isInside(beam) {
    return !(beam.x >= W || beam.x < 0 || beam.y >= H || beam.y < 0);
  }

  let max = -Infinity;

  for (const { x, y, dir } of options) {
    const visited = new Set();
    const energized = new Set();
    const beams = [{ y, x, dir }];

    visited.add(`${x}|${y}|${dir}`);
    energized.add(`${x}|${y}`);

    while (true) {
      const before = visited.size;

      for (const beam of beams) {
        if (!isInside(beam)) continue;

        const cell = grid[beam.y][beam.x];

        switch (cell) {
          case '.':
            {
              const [dx, dy] = deltas[beam.dir];
              beam.x = beam.x + dx;
              beam.y = beam.y + dy;

              const key = getKey(beam);

              if (isInside(beam) && !visited.has(key)) {
                visited.add(key);
                energized.add(`${beam.x}|${beam.y}`);
              }
            }
            break;

          case '|':
            {
              if (beam.dir === DIR.RIGHT || beam.dir === DIR.LEFT) {
                const [dx1, dy1] = deltas[DIR.UP];
                const newBeam = { x: beam.x + dx1, y: beam.y + dy1, dir: DIR.UP };
                const newKey = getKey(newBeam);

                if (isInside(newBeam) && !visited.has(newKey)) {
                  beams.push(newBeam);
                  visited.add(newKey);
                  energized.add(`${newBeam.x}|${newBeam.y}`);
                }

                const [dx2, dy2] = deltas[DIR.DOWN];
                beam.x = beam.x + dx2;
                beam.y = beam.y + dy2;
                beam.dir = DIR.DOWN;

                const key = getKey(beam);

                if (isInside(beam) && !visited.has(key)) {
                  visited.add(key);
                  energized.add(`${beam.x}|${beam.y}`);
                }
              } else {
                const [dx, dy] = deltas[beam.dir];
                beam.x = beam.x + dx;
                beam.y = beam.y + dy;

                const key = getKey(beam);

                if (isInside(beam) && !visited.has(key)) {
                  visited.add(key);
                  energized.add(`${beam.x}|${beam.y}`);
                }
              }
            }
            break;

          case '\\':
            {
              switch (beam.dir) {
                case DIR.RIGHT:
                  beam.dir = DIR.DOWN;
                  break;
                case DIR.LEFT:
                  beam.dir = DIR.UP;
                  break;
                case DIR.UP:
                  beam.dir = DIR.LEFT;
                  break;
                case DIR.DOWN:
                  beam.dir = DIR.RIGHT;
                  break;
              }

              const [dx, dy] = deltas[beam.dir];
              beam.x = beam.x + dx;
              beam.y = beam.y + dy;

              const key = getKey(beam);

              if (isInside(beam) && !visited.has(key)) {
                visited.add(key);
                energized.add(`${beam.x}|${beam.y}`);
              }
            }
            break;

          case '/':
            {
              switch (beam.dir) {
                case DIR.RIGHT:
                  beam.dir = DIR.UP;
                  break;
                case DIR.LEFT:
                  beam.dir = DIR.DOWN;
                  break;
                case DIR.UP:
                  beam.dir = DIR.RIGHT;
                  break;
                case DIR.DOWN:
                  beam.dir = DIR.LEFT;
                  break;
              }

              const [dx, dy] = deltas[beam.dir];
              beam.x = beam.x + dx;
              beam.y = beam.y + dy;

              const key = getKey(beam);

              if (isInside(beam) && !visited.has(key)) {
                visited.add(key);
                energized.add(`${beam.x}|${beam.y}`);
              }
            }
            break;

          case '-': {
            if (beam.dir === DIR.UP || beam.dir === DIR.DOWN) {
              const [dx1, dy1] = deltas[DIR.LEFT];
              const newBeam = { x: beam.x + dx1, y: beam.y + dy1, dir: DIR.LEFT };
              const newKey = getKey(newBeam);

              if (isInside(newBeam) && !visited.has(newKey)) {
                beams.push(newBeam);
                visited.add(newKey);
                energized.add(`${newBeam.x}|${newBeam.y}`);
              }

              const [dx2, dy2] = deltas[DIR.RIGHT];
              beam.x = beam.x + dx2;
              beam.y = beam.y + dy2;
              beam.dir = DIR.RIGHT;

              const key = getKey(beam);

              if (isInside(beam) && !visited.has(key)) {
                visited.add(key);
                energized.add(`${beam.x}|${beam.y}`);
              }
            } else {
              const [dx, dy] = deltas[beam.dir];
              beam.x = beam.x + dx;
              beam.y = beam.y + dy;

              const key = getKey(beam);

              if (isInside(beam) && !visited.has(key)) {
                visited.add(key);
                energized.add(`${beam.x}|${beam.y}`);
              }
            }
          }
        }
      }

      if (visited.size === before) break;
    }

    max = Math.max(max, energized.size);
  }

  return max;
}

const deltas = [
  [-1, 0],
  [0, -1],
  [1, 0],
  [0, 1],
];

function getKey(beam) {
  return `$${beam.x}|${beam.y}|${beam.dir}`;
}
