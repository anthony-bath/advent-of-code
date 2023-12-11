import Algorithms
import Foundation

struct Day11: AdventDay {
  var data: String
  var lines: [String]

  func manhattan(_ p1: (x: Int, y: Int), _ p2: (x: Int, y: Int)) -> Int {
    return abs(p1.x - p2.x) + abs(p1.y - p2.y)
  }

  func expandedDistance(_ p1: (x: Int, y: Int), _ p2: (x: Int, y: Int), _ cols: [Int], _ rows: [Int], _ factor: Int) -> Int {
    let xMin = min(p1.x, p2.x)
    let xMax = max(p1.x, p2.x)
    let yMin = min(p1.y, p2.y)
    let yMax = max(p1.y, p2.y)

    let colsBetween = cols.filter { $0 > xMin && $0 < xMax }.count
    let rowsBetween = rows.filter { $0 > yMin && $0 < yMax }.count

    return (colsBetween + rowsBetween) * (factor - 1)
  }

  func getGalaxyData() -> GalaxyData {
    var galaxies: [(x: Int, y: Int)] = []
    var blankRows: [Int] = []
    var grid: [[String]] = []

    for (y, line) in lines.enumerated() {
      var hasGalaxies = false
      let row = line.map { String($0) }

      for x in 0 ..< row.count {
        if row[x] == "#" {
          galaxies.append((x: x, y: y))
          hasGalaxies = true
        }
      }

      if !hasGalaxies {
        blankRows.append(y)
      }

      grid.append(row)
    }

    let rowIndices = Array(0 ..< grid[0].count)
    var blankCols: [Int] = []

    for x in 0 ..< grid[0].count {
      if rowIndices.allSatisfy({ grid[$0][x] == "." }) {
        blankCols.append(x)
      }
    }

    return GalaxyData(galaxies: galaxies, blankCols: blankCols, blankRows: blankRows)
  }

  func calculateTotalDistance(expansionFactor: Int) -> Int {
    let data = getGalaxyData()
    let galaxies = data.galaxies
    let blankCols = data.blankCols
    let blankRows = data.blankRows

    var total = 0

    for i in 0 ..< data.galaxies.count {
      for j in (i + 1) ..< data.galaxies.count {
        total = total + manhattan(galaxies[i], galaxies[j]) + expandedDistance(galaxies[i], galaxies[j], blankCols, blankRows, expansionFactor)
      }
    }

    return total
  }

  func part1() -> Any {
    calculateTotalDistance(expansionFactor: 2)
  }

  func part2() -> Any {
    calculateTotalDistance(expansionFactor: 1_000_000)
  }
}

struct GalaxyData {
  var galaxies: [(x: Int, y: Int)]
  var blankCols: [Int]
  var blankRows: [Int]
}
