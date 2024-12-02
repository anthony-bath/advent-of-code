import Algorithms

extension Year2023.Day13 {
  var grids: [[[String]]] {
    var grids: [[[String]]] = []
    var currentGrid: [[String]] = []

    for line in lines {
      if line.isEmpty {
        grids.append(currentGrid)
        currentGrid = []
        continue
      }

      currentGrid.append(line.map { String($0) })
    }

    grids.append(currentGrid)

    return grids
  }
}

extension Year2023 {
  struct Day13: AdventDay {
    var data: String
    var lines: [String]

    func getReflectionValue(grid: [[String]], maxDifferences: Int) -> Int {
      let W = grid[0].count
      let H = grid.count

      let columnIndices = Array(0 ..< W)
      let rowIndices = Array(0 ..< H)

      // Check Horizontal
      var rowEntries: [(row: Int, diffs: Int)] = []

      for row in stride(from: 1, to: H, by: 1) {
        let diffs = columnIndices.filter { grid[row][$0] != grid[row - 1][$0] }.count

        if diffs <= maxDifferences {
          rowEntries.append((row: row, diffs: diffs))
        }
      }

      for (row, diffs) in rowEntries {
        var up = row - 2
        var down = row + 1
        var diffs = diffs

        while up >= 0 && down < H {
          diffs += columnIndices.filter { grid[up][$0] != grid[down][$0] }.count

          if diffs > maxDifferences {
            break
          }

          up -= 1
          down += 1
        }

        if diffs == maxDifferences {
          return row * 100
        }
      }

      // Check Vertical
      var colEntries: [(col: Int, diffs: Int)] = []

      for col in stride(from: 1, to: W, by: 1) {
        let diffs = rowIndices.filter { grid[$0][col] != grid[$0][col - 1] }.count

        if diffs <= maxDifferences {
          colEntries.append((col: col, diffs: diffs))
        }
      }

      for (col, diffs) in colEntries {
        var left = col - 2
        var right = col + 1
        var diffs = diffs

        while left >= 0 && right < W {
          diffs += rowIndices.filter { grid[$0][left] != grid[$0][right] }.count

          if diffs > maxDifferences {
            break
          }

          left -= 1
          right += 1
        }

        if diffs == maxDifferences {
          return col
        }
      }

      fatalError("Reflection Not Found")
    }

    func part1() -> Any {
      grids.map { getReflectionValue(grid: $0, maxDifferences: 0) }.reduce(0) { $0 + $1 }
    }

    func part2() -> Any {
      grids.map { getReflectionValue(grid: $0, maxDifferences: 1) }.reduce(0) { $0 + $1 }
    }
  }
}
