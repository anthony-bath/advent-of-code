import Algorithms

struct Day17: AdventDay {
  var data: String
  var lines: [String]

  enum DIR {
    static let LEFT = 0
    static let UP = 1
    static let RIGHT = 2
    static let DOWN = 3
  }

  let deltas = [
    (-1, 0, DIR.LEFT),
    (0, -1, DIR.UP),
    (1, 0, DIR.RIGHT),
    (0, 1, DIR.DOWN),
  ]

  func key(_ state: (Int, Int, Int, Int, Int)) -> String {
    let (_, x, y, dir, steps) = state
    return "\(x)|\(y)\(dir)|\(steps)"
  }

  func insertIntoSortedQueue(
    _ queue: inout [(Int, Int, Int, Int, Int)],
    _ state: (Int, Int, Int, Int, Int)
  ) {
    var low = 0
    var high = queue.count

    while low < high {
      let mid = (low + high) >> 1

      if queue[mid].0 < state.0 {
        low = mid + 1
      } else {
        high = mid
      }
    }

    queue.insert(state, at: low)
  }

  func part1() -> Any {
    let grid = lines.map { $0.map { String($0) }}
    let W = grid[0].count
    let H = grid.count

    var visited = Set<String>()

    // heat loss, x, y, steps, dir
    var queue = [(0, 0, 0, 1, DIR.RIGHT)]

    while queue.count > 0 {
      let current = queue.removeFirst()

      if current.1 == W - 1 && current.2 == H - 1 {
        return current.0
      }

      for (dx, dy, direction) in deltas {
        if direction == (current.4 + 2) % 4 {
          continue
        }

        let (x, y) = (current.1 + dx, current.2 + dy)
        guard x >= 0 && x < W && y >= 0 && y < H else { continue }

        let heatLoss = current.0 + Int(grid[y][x])!
        let steps = direction == current.4 ? current.3 + 1 : 1
        let next = (heatLoss, x, y, steps, direction)
        let nextKey = key(next)

        if steps <= 3 && !visited.contains(nextKey) {
          insertIntoSortedQueue(&queue, next)
          visited.insert(nextKey)
        }
      }
    }

    return -1
  }

  func part2() -> Any {
    let grid = lines.map { $0.map { String($0) }}
    let W = grid[0].count
    let H = grid.count

    var visited = Set<String>()

    // heat loss, x, y, steps, dir
    var queue = [(0, 0, 0, 1, DIR.RIGHT)]

    while queue.count > 0 {
      let current = queue.removeFirst()

      if current.1 == W - 1 && current.2 == H - 1 {
        if current.3 >= 4 {
          return current.0
        }

        continue
      }

      for (dx, dy, direction) in deltas {
        if direction == (current.4 + 2) % 4 {
          continue
        }

        if direction != current.4 && current.3 < 4 {
          continue
        }

        let (x, y) = (current.1 + dx, current.2 + dy)
        guard x >= 0 && x < W && y >= 0 && y < H else { continue }

        let heatLoss = current.0 + Int(grid[y][x])!
        let steps = direction == current.4 ? current.3 + 1 : 1
        let next = (heatLoss, x, y, steps, direction)
        let nextKey = key(next)

        if steps <= 10 && !visited.contains(nextKey) {
          insertIntoSortedQueue(&queue, next)
          visited.insert(nextKey)
        }
      }
    }

    return -1
  }
}
