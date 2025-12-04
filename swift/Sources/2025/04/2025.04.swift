import Algorithms

extension Year2025 {
  struct Day04: AdventDay {
    var grid: [[String]]
    let deltas = [(-1, 0), (-1, -1), (0, -1), (1, -1), (1, 0), (1, 1), (0, 1), (-1, 1)]

    init(data _: String, lines: [String]) {
      grid = lines.map { $0.map { String($0) } }
    }

    func part1() -> Any {
      var count = 0
      let W = grid[0].count
      let H = grid.count

      for y in 0 ..< H {
        cell: for x in 0 ..< W {
          guard grid[y][x] == "@" else { continue }

          var adjacent = 0

          for (dx, dy) in deltas {
            let (tx, ty) = (x + dx, y + dy)
            guard tx >= 0 && tx < W && ty >= 0 && ty < H else { continue }

            if grid[ty][tx] == "@" {
              adjacent += 1

              if adjacent >= 4 {
                continue cell
              }
            }
          }

          count += 1
        }
      }

      return count
    }

    func part2() -> Any {
      var count = 0
      let W = grid[0].count
      let H = grid.count
      var removed = true
      var p2grid = grid.map { $0.map { $0 }}

      while removed {
        removed = false

        for y in 0 ..< H {
          cell: for x in 0 ..< W {
            guard p2grid[y][x] == "@" else { continue }

            var adjacent = 0

            for (dx, dy) in deltas {
              let (tx, ty) = (x + dx, y + dy)
              guard tx >= 0 && tx < W && ty >= 0 && ty < H else { continue }

              if p2grid[ty][tx] == "@" {
                adjacent += 1

                if adjacent >= 4 {
                  continue cell
                }
              }
            }

            p2grid[y][x] = "."
            count += 1
            removed = true
          }
        }
      }

      return count
    }
  }
}
