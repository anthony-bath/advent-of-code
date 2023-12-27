import Algorithms
import Foundation

struct Day21: AdventDay {
  var data: String
  var lines: [String]

  func getGrid() -> [[String]] {
    lines.map { $0.map { String($0) } }
  }

  func part1() -> Any {
    let grid = getGrid()
    let (sx, sy) = (grid.count / 2, grid[0].count / 2)
    var distance = Array(
      repeating: Array(repeating: Int.max, count: grid[0].count),
      count: grid.count
    )

    distance[sy][sx] = 0

    var queue = [(sx, sy)]

    while !queue.isEmpty {
      let (x, y) = queue.removeFirst()

      for (dx, dy) in [(0, -1), (0, 1), (-1, 0), (1, 0)] {
        let (nx, ny) = (x + dx, y + dy)

        if nx < 0 || nx >= grid[0].count || ny < 0 || ny >= grid.count {
          continue
        }

        if grid[ny][nx] == "#" {
          continue
        }

        if distance[ny][nx] > distance[y][x] + 1 {
          distance[ny][nx] = distance[y][x] + 1
          queue.append((nx, ny))
        }
      }
    }

    var points = 0

    for y in 0 ..< grid.count {
      for x in 0 ..< grid[0].count {
        if distance[y][x] <= 64 && distance[y][x] % 2 == 0 {
          points += 1
        }
      }
    }

    return points
  }

  func part2() -> Any {
    let grid = getGrid()
    let (sx, sy) = (grid.count / 2, grid[0].count / 2)
    var distance = Array(
      repeating: Array(repeating: Int.max, count: grid[0].count),
      count: grid.count
    )

    distance[sy][sx] = 0

    var queue = [(sx, sy)]

    while !queue.isEmpty {
      let (x, y) = queue.removeFirst()

      for (dx, dy) in [(0, -1), (0, 1), (-1, 0), (1, 0)] {
        let (nx, ny) = (x + dx, y + dy)

        if nx < 0 || nx >= grid[0].count || ny < 0 || ny >= grid.count {
          continue
        }

        if grid[ny][nx] == "#" {
          continue
        }

        if distance[ny][nx] > distance[y][x] + 1 {
          distance[ny][nx] = distance[y][x] + 1
          queue.append((nx, ny))
        }
      }
    }

    let validDistances = distance.flatMap { $0 }.filter { $0 < Int.max }

    let evenDistances = validDistances.filter { $0 % 2 == 0 }.count
    let oddDistances = validDistances.filter { $0 % 2 == 1 }.count
    let oddCornerDistances = validDistances.filter { $0 > 65 && $0 % 2 == 1 }.count
    let evenCornerDistances = validDistances.filter { $0 > 65 && $0 % 2 == 0 }.count

    let STEPS = 26_501_365
    let n = Int(floor(Double(STEPS) / 131.0))

    let oddTotal = ((n + 1) * (n + 1)) * oddDistances
    let evenTotal = (n * n) * evenDistances
    let oddCornerTotal = (n + 1) * oddCornerDistances
    let evenCornerTotal = n * evenCornerDistances

    let total = oddTotal + evenTotal - oddCornerTotal + evenCornerTotal - n

    return total
  }
}
