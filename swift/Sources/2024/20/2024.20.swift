import Algorithms

extension Year2024 {
  struct Day20: AdventDay {
    var grid: [[String]]
    var start: Geometry.Point
    var end: Geometry.Point
    let W: Int
    let H: Int

    init(data _: String, lines: [String]) {
      grid = lines.map { $0.map { String($0) } }

      var start: Geometry.Point?
      var end: Geometry.Point?

      for y in 0 ..< grid.count {
        for x in 0 ..< grid[y].count {
          if grid[y][x] == "S" {
            start = Geometry.Point(x: x, y: y)
            grid[y][x] = "."
          }

          if grid[y][x] == "E" {
            end = Geometry.Point(x: x, y: y)
            grid[y][x] = "."
          }
        }
      }

      self.start = start!
      self.end = end!
      W = grid[0].count
      H = grid.count
    }

    func getData() -> (time: [[Int]], path: [Geometry.Point]) {
      var visited = Set([start])
      var path = [start]
      var time = Array(repeating: Array(repeating: Int.max, count: W), count: H)
      time[start.y][start.x] = 0

      var current = start

      while true {
        if current == end {
          break
        }

        let currentTime = time[current.y][current.x]

        let next = current.cardinalNeighbors
          .filter { $0.y >= 0 && $0.y <= H && $0.x >= 0 && $0.x <= W && !visited.contains($0) }
          .first { grid[$0.y][$0.x] == "." }!

        visited.insert(next)
        path.append(next)

        time[next.y][next.x] = currentTime + 1
        current = next
      }

      return (time, path)
    }

    func part1() -> Any {
      let (time, path) = getData()
      var cheats: Set<Cheat> = []

      for point in path {
        for neighbor in point.cardinalNeighbors {
          if neighbor.y < 0 || neighbor.y >= H || neighbor.x < 0 || neighbor.x >= W {
            continue
          }

          if grid[neighbor.y][neighbor.x] == "#" {
            for neighbor2 in neighbor.cardinalNeighbors {
              if neighbor2.y < 0 || neighbor2.y >= H || neighbor2.x < 0 || neighbor2.x >= W {
                continue
              }

              if grid[neighbor2.y][neighbor2.x] == "." {
                let save = time[neighbor2.y][neighbor2.x] - (time[point.y][point.x] + 2)

                if save >= 100 {
                  cheats.insert(Cheat(start: neighbor, end: neighbor2))
                }
              }
            }
          }
        }
      }

      return cheats.count
    }

    func part2() -> Any {
      let (time, path) = getData()
      var cheats: Set<Cheat> = []

      for point in path {
        for y in point.y - 20 ... point.y + 20 {
          for x in point.x - 20 ... point.x + 20 {
            guard x >= 0 && x < W && y >= 0 && y < H else { continue }
            guard grid[y][x] == "." else { continue }

            let target = Geometry.Point(x: x, y: y)
            let distance = point.manhattanDistance(from: target)
            guard distance <= 20 else { continue }

            let save = time[target.y][target.x] - time[point.y][point.x] - distance

            if save >= 100 {
              cheats.insert(Cheat(start: point, end: target))
            }
          }
        }
      }

      return cheats.count
    }

    struct Cheat: Hashable {
      let start: Geometry.Point
      let end: Geometry.Point
    }
  }
}
