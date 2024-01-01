import Algorithms
import Foundation

struct Day23: AdventDay {
  var data: String
  var lines: [String]

  let deltas = [(-1, 0), (0, 1), (1, 0), (0, -1)]
  let dirs = [
    ">": [(1, 0)],
    "v": [(0, 1)],
    ".": [(-1, 0), (0, 1), (1, 0), (0, -1)],
  ]

  func getGrid() -> [[String]] {
    lines.map { line in
      line.map { String($0) }
    }
  }

  func getJunctions(grid: [[String]]) -> [(Int, Int)] {
    var junctions: [(Int, Int)] = [(1, 0), (grid[0].count - 2, grid.count - 1)]

    for y in 0 ..< grid.count {
      for x in 0 ..< grid[y].count {
        if grid[y][x] == "#" {
          continue
        }

        var count = 0

        for (dx, dy) in deltas {
          let nx = x + dx
          let ny = y + dy

          if nx < 0 || nx >= grid[y].count || ny < 0 || ny >= grid.count || grid[ny][nx] == "#" {
            continue
          }

          count += 1
        }

        if count >= 3 {
          junctions.append((x, y))
        }
      }
    }

    return junctions
  }

  func buildGraph(grid: [[String]], dirs: [String: [(Int, Int)]]?) -> [String: [String: Int]] {
    var graph: [String: [String: Int]] = [:]
    let junctions = getJunctions(grid: grid)

    for (x, y) in junctions {
      graph["\(x),\(y)"] = [:]
    }

    for (x, y) in junctions {
      var stack = [(x, y, 0)]
      let key = "\(x),\(y)"
      var seen = Set<String>()

      seen.insert(key)

      while !stack.isEmpty {
        let (sx, sy, dist) = stack.removeLast()
        let junction = junctions.first { $0.0 == sx && $0.1 == sy }

        if dist > 0, let junction = junction {
          graph[key]!["\(junction.0),\(junction.1)"] = dist
          continue
        }

        let dxdy = dirs?[grid[sy][sx]] ?? deltas

        for (dx, dy) in dxdy {
          let nx = sx + dx
          let ny = sy + dy
          let nkey = "\(nx),\(ny)"

          if nx < 0 || nx >= grid[0].count || ny < 0 || ny >= grid
            .count || grid[ny][nx] == "#" || seen.contains(nkey)
          {
            continue
          }

          seen.insert(nkey)
          stack.append((nx, ny, dist + 1))
        }
      }
    }

    return graph
  }

  func part1() -> Any {
    let grid = getGrid()
    let graph = buildGraph(grid: grid, dirs: dirs)
    let ex = grid[0].count - 2
    let ey = grid.count - 1
    var seen = Set<String>()

    func dfs(_ x: Int, _ y: Int) -> Int {
      if x == ex, y == ey {
        return 0
      }

      var maxDistance = Int.min

      for (key, distance) in graph["\(x),\(y)"]! {
        if seen.contains(key) {
          continue
        }

        seen.insert(key)
        let coords = key.split(separator: ",").map { Int($0)! }
        let nx = coords[0]
        let ny = coords[1]

        maxDistance = max(maxDistance, distance + dfs(nx, ny))
        seen.remove(key)
      }

      return maxDistance
    }

    return dfs(1, 0)
  }

  func part2() -> Any {
    let grid = getGrid()
    let graph = buildGraph(grid: grid, dirs: nil)
    let ex = grid[0].count - 2
    let ey = grid.count - 1
    var seen = Set<String>()

    func dfs(_ x: Int, _ y: Int) -> Int {
      if x == ex, y == ey {
        return 0
      }

      var maxDistance = Int.min

      for (key, distance) in graph["\(x),\(y)"]! {
        if seen.contains(key) {
          continue
        }

        seen.insert(key)
        let coords = key.split(separator: ",").map { Int($0)! }
        let nx = coords[0]
        let ny = coords[1]

        maxDistance = max(maxDistance, distance + dfs(nx, ny))
        seen.remove(key)
      }

      return maxDistance
    }

    return dfs(1, 0)
  }
}
