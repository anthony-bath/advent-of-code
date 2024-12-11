import Algorithms
import Foundation

extension Year2024 {
  struct Day08: AdventDay {
    var grid: [[String]]
    var antennae: [String: [Point]] = [:]
    let W: Int
    let H: Int

    init(data _: String, lines: [String]) {
      grid = lines.map { $0.map { String($0) } }
      W = grid[0].count
      H = grid.count

      for row in grid.indices {
        for col in grid[row].indices {
          let cell = grid[row][col]

          if cell != "." {
            antennae[cell] = antennae[cell, default: []] + [Point(x: col, y: row)]
          }
        }
      }
    }

    struct Point: Hashable {
      let x: Int
      let y: Int
    }

    func part1() -> Any {
      var antinodes: Set<Point> = []

      for (_, positions) in antennae {
        for i in 0 ..< positions.count {
          for j in i + 1 ..< positions.count {
            let p1 = positions[i]
            let p2 = positions[j]
            let xDiff = abs(p1.x - p2.x)
            let yDiff = abs(p1.y - p2.y)

            if p1.y == p2.y {
              // Horizontal Line
              antinodes.insert(Point(x: min(p1.x, p2.x) - xDiff, y: p1.y))
              antinodes.insert(Point(x: max(p1.x, p2.x) + xDiff, y: p1.y))
            } else if p1.x == p2.x {
              // Vertical Line
              antinodes.insert(Point(x: p1.x, y: min(p1.y, p2.y) - yDiff))
              antinodes.insert(Point(x: p1.x, y: max(p1.y, p2.y) + yDiff))
            } else {
              let m = Double(p2.y - p1.y) / Double(p2.x - p1.x)

              if m > 0 {
                if p1.x > p2.x {
                  antinodes.insert(Point(x: p1.x + xDiff, y: p1.y + yDiff))
                  antinodes.insert(Point(x: p2.x - xDiff, y: p2.y - yDiff))
                } else {
                  antinodes.insert(Point(x: p1.x - xDiff, y: p1.y - yDiff))
                  antinodes.insert(Point(x: p2.x + xDiff, y: p2.y + yDiff))
                }
              } else {
                if p1.x > p2.x {
                  antinodes.insert(Point(x: p1.x + xDiff, y: p1.y - yDiff))
                  antinodes.insert(Point(x: p2.x - xDiff, y: p2.y + yDiff))
                } else {
                  antinodes.insert(Point(x: p1.x - xDiff, y: p1.y + yDiff))
                  antinodes.insert(Point(x: p2.x + xDiff, y: p2.y - yDiff))
                }
              }
            }
          }
        }
      }

      return antinodes.filter { $0.x >= 0 && $0.x < W && $0.y >= 0 && $0.y < H }.count
    }

    func part2() -> Any {
      0
    }
  }
}

// 373 - Too High
