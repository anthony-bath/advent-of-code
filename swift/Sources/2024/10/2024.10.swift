import Algorithms

extension Year2024 {
  struct Day10: AdventDay {
    var grid: [[Int]]
    let W: Int
    let H: Int

    var trailheads: [Point]

    init(data _: String, lines: [String]) {
      grid = lines.map { $0.map { Int(String($0))! } }
      W = grid[0].count
      H = grid.count

      trailheads = []

      for y in 0 ..< grid.count {
        for x in 0 ..< grid[y].count {
          if grid[y][x] == 0 {
            trailheads.append(Point(x: x, y: y))
          }
        }
      }
    }

    func part1() -> Any {
      var queue: [QueueItem] = []
      var reachedByTrailhead = [Point: Set<Point>]()

      for trailhead in trailheads {
        queue.append(QueueItem(path: [trailhead], visited: [trailhead]))
        reachedByTrailhead[trailhead] = []
      }

      while !queue.isEmpty {
        let item = queue.removeFirst()

        if item.path.count == 10 {
          reachedByTrailhead[item.path.first!]!.insert(item.path.last!)
          continue
        }

        let last = item.path.last!
        let lastValue = grid[last.y][last.x]

        for neighbor in last.neighbors {
          if neighbor.x < 0 || neighbor.x >= W || neighbor.y < 0 || neighbor.y >= H {
            continue
          }

          if item.visited.contains(neighbor) {
            continue
          }

          let neighborValue = grid[neighbor.y][neighbor.x]

          if neighborValue == lastValue + 1 {
            queue.append(QueueItem(
              path: item.path + [neighbor],
              visited: item.visited.union([neighbor])
            ))
          }
        }
      }

      return reachedByTrailhead.values.map { $0.count }.reduce(0, +)
    }

    func part2() -> Any {
      var queue: [QueueItem] = trailheads.map { QueueItem(path: [$0], visited: [$0]) }
      var score = 0

      while !queue.isEmpty {
        let item = queue.removeFirst()

        if item.path.count == 10 {
          score += 1
          continue
        }

        let last = item.path.last!
        let lastValue = grid[last.y][last.x]

        for neighbor in last.neighbors {
          if neighbor.x < 0 || neighbor.x >= W || neighbor.y < 0 || neighbor.y >= H {
            continue
          }

          if item.visited.contains(neighbor) {
            continue
          }

          let neighborValue = grid[neighbor.y][neighbor.x]

          if neighborValue == lastValue + 1 {
            queue.append(QueueItem(
              path: item.path + [neighbor],
              visited: item.visited.union([neighbor])
            ))
          }
        }
      }

      return score
    }

    struct QueueItem {
      let path: [Point]
      let visited: Set<Point>
    }

    struct Point: Hashable {
      let x: Int
      let y: Int

      var neighbors: [Point] {
        [Point(x: x - 1, y: y), Point(x: x + 1, y: y), Point(x: x, y: y - 1), Point(x: x, y: y + 1)]
      }
    }
  }
}
