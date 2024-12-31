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
      var queue = [QueueItem]()

      for y in 0 ..< grid.count {
        for x in 0 ..< grid[y].count {
          if grid[y][x] == "X" {
            let point = Point(x: x, y: y)
            queue.append(QueueItem(location: point, visited: [point], path: [point]))
          }
        }
      }

      var count = 0
      var paths = [[Point]]()

      while !queue.isEmpty {
        let item = queue.removeFirst()

        if item.path.count == 4 {
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

          if grid[ny][nx] != XMAS[item.path.count] {
            continue
          }

          let nextPoint = Point(x: nx, y: ny)

          if item.visited.contains(nextPoint) {
            continue
          }

          let nextPath = Array(item.path) + [nextPoint]
          let indices = Array(1 ..< nextPath.count)

          let dx = indices.map { nextPath[$0].x - nextPath[$0 - 1].x }
          let dy = indices.map { nextPath[$0].y - nextPath[$0 - 1].y }

          if dx.allSatisfy({ $0 == dx[0] }) && dy.allSatisfy({ $0 == dy[0] }) {
            queue.append(QueueItem(
              location: nextPoint,
              visited: Set(item.visited).union([nextPoint]),
              path: nextPath
            ))
          }
        }
      }

      return count
    }

    func part2() -> Any {
      var queue = [Point]()

      for y in 1 ..< grid.count - 1 {
        for x in 1 ..< grid[y].count - 1 {
          if grid[y][x] == "A" {
            queue.append(Point(x: x, y: y))
          }
        }
      }

      let validConfiurations = Set(["MMSS", "SSMM", "MSMS", "SMSM"])
      var count = 0

      while !queue.isEmpty {
        let point = queue.removeFirst()

        let tl = grid[point.y - 1][point.x - 1]
        let tr = grid[point.y - 1][point.x + 1]
        let bl = grid[point.y + 1][point.x - 1]
        let br = grid[point.y + 1][point.x + 1]

        if validConfiurations.contains("\(tl)\(tr)\(bl)\(br)") {
          count += 1
        }
      }

      return count
    }

    struct Point: Hashable {
      let x: Int
      let y: Int
    }

    struct QueueItem: Hashable {
      let location: Point
      let visited: Set<Point>
      let path: [Point]
    }
  }
}
