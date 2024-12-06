import Algorithms

extension Year2024 {
  struct Day04: AdventDay {
    var grid: [[String]]
    let DELTAS = [
      (x: -1, y: -1),
      (x: -1, y: 0),
      (x: -1, y: 1),
      (x: 0, y: -1),
      (x: 0, y: 1),
      (x: 1, y: -1),
      (x: 1, y: 0),
      (x: 1, y: 1),
    ]
    let XMAS = ["X", "M", "A", "S"]

    init(data _: String, lines: [String]) {
      grid = lines.map { $0.map { String($0) } }
    }

    func part1() -> Any {
      var queue = [Item]()

      for y in 0 ..< grid.count {
        for x in 0 ..< grid[y].count {
          if grid[y][x] == "X" {
            let point = Point(x: x, y: y)
            queue.append(Item(location: point, visited: [point], steps: 1, path: [point]))
          }
        }
      }

      var count = 0
      var paths = [[Point]]()

      while !queue.isEmpty {
        let item = queue.removeFirst()

        if item.steps == 4 {
          count += 1
          paths.append(item.path)
          continue
        }

        for (x, y) in DELTAS {
          let nx = item.location.x + x
          let ny = item.location.y + y

          if nx < 0 || ny < 0 || nx >= grid[0].count || ny >= grid.count {
            continue
          }

          if item.visited.contains(Point(x: nx, y: ny)) {
            continue
          }

          if grid[ny][nx] != XMAS[item.steps] {
            continue
          }

          // TODO: Can check if straight line here I think if we are adding the 3rd and 4th point
          // x would be the same, or y would be the same, or dx and dy would be the same
          let nextPath = Array(item.path) + [Point(x: nx, y: ny)]

          if isStraightLine(nextPath) {
            queue.append(Item(
              location: Point(x: nx, y: ny),
              visited: Set(item.visited).union([Point(x: nx, y: ny)]),
              steps: item.steps + 1,
              path: nextPath
            ))
          }
        }
      }

      return count
    }

    func part2() -> Any {
      0
    }

    func isStraightLine(_ path: [Point]) -> Bool {
      let x = path.map { $0.x }
      let y = path.map { $0.y }

      // Check horizontal or vertical
      if x.allSatisfy({ $0 == x[0] }) || y.allSatisfy({ $0 == y[0] }) {
        return true
      }

      // Check diagonal: need consistent x and y direction throughout
      let dx = x[1] - x[0]
      let dy = y[1] - y[0]

      for i in 1 ..< path.count {
        if (x[i] - x[i - 1]) != dx || (y[i] - y[i - 1]) != dy {
          return false
        }
      }

      return true
    }

    struct Point: Hashable {
      let x: Int
      let y: Int
    }

    struct Item: Hashable {
      let location: Point
      let visited: Set<Point>
      let steps: Int
      let path: [Point]
    }
  }
}
