import Algorithms

// TODO: Improve performance as Part 2runs quite slow

struct Day14: AdventDay {
  var data: String
  var lines: [String]

  func loadData() -> Day14Data {
    var yMax = 0
    var xMax = 0
    var blockersByColumn: [Int: [Int]] = [:]
    var blockersByRow: [Int: [Int]] = [:]
    var allStones: [Stone] = []

    for (y, line) in lines.enumerated() {
      for (x, cell) in line.enumerated() {
        if cell == "#" {
          if !blockersByColumn.keys.contains(x) {
            blockersByColumn[x] = []
          }

          if !blockersByRow.keys.contains(y) {
            blockersByRow[y] = []
          }

          blockersByColumn[x]!.append(y)
          blockersByRow[y]!.append(x)
        } else if cell == "O" {
          allStones.append(Stone(x: x, y: y))
        }
      }

      xMax = line.count
      yMax = y + 1
    }

    return Day14Data(
      yMax: yMax,
      xMax: xMax,
      blockersByColumn: blockersByColumn,
      blockersByRow: blockersByRow,
      allStones: allStones
    )
  }

  func tiltNorth(_ allStones: [Stone], _ xMax: Int, _ blockersByColumn: [Int: [Int]]) {
    for x in 0 ..< xMax {
      let stones = allStones.filter { $0.x == x }.sorted { $0.y < $1.y }
      guard !stones.isEmpty else { continue }

      for stone in stones {
        guard stone.y > 0 else { continue }

        let blockersAbove = blockersByColumn[x]?.filter { $0 < stone.y } ?? []
        let stonesAbove = stones.filter { $0.y < stone.y }.map { $0.y }
        let occupied = blockersAbove + stonesAbove

        stone.y = occupied.isEmpty ? 0 : 1 + (occupied.max() ?? 0)
      }
    }
  }

  func tiltWest(_ allStones: [Stone], _ yMax: Int, _ blockersByRow: [Int: [Int]]) {
    for y in 0 ..< yMax {
      let stones = allStones.filter { $0.y == y }.sorted { $0.x < $1.x }
      guard !stones.isEmpty else { continue }

      for stone in stones {
        guard stone.x > 0 else { continue }

        let blockersLeft = blockersByRow[y]?.filter { $0 < stone.x } ?? []
        let stonesLeft = stones.filter { $0.x < stone.x }.map { $0.x }
        let occupied = blockersLeft + stonesLeft

        stone.x = occupied.isEmpty ? 0 : 1 + (occupied.max() ?? 0)
      }
    }
  }

  func tiltSouth(_ allStones: [Stone], _ xMax: Int, _ yMax: Int, _ blockersByColumn: [Int: [Int]]) {
    for x in 0 ..< xMax {
      let stones = allStones.filter { $0.x == x }.sorted { $0.y > $1.y }
      guard !stones.isEmpty else { continue }

      for stone in stones {
        guard stone.y < (yMax - 1) else { continue }

        let blockersBelow = blockersByColumn[x]?.filter { $0 > stone.y } ?? []
        let stonesBelow = stones.filter { $0.y > stone.y }.map { $0.y }
        let occupied = blockersBelow + stonesBelow

        stone.y = occupied.isEmpty ? yMax - 1 : (occupied.min() ?? 0) - 1
      }
    }
  }

  func tiltEast(_ allStones: [Stone], _ xMax: Int, _ yMax: Int, _ blockersByRow: [Int: [Int]]) {
    for y in 0 ..< yMax {
      let stones = allStones.filter { $0.y == y }.sorted { $0.x > $1.x }
      guard !stones.isEmpty else { continue }

      for stone in stones {
        guard stone.x < (xMax - 1) else { continue }

        let blockersRight = blockersByRow[y]?.filter { $0 > stone.x } ?? []
        let stonesRight = stones.filter { $0.x > stone.x }.map { $0.x }
        let occupied = blockersRight + stonesRight

        stone.x = occupied.isEmpty ? xMax - 1 : (occupied.min() ?? 0) - 1
      }
    }
  }

  func cycle(data: Day14Data) {
    tiltNorth(data.allStones, data.xMax, data.blockersByColumn)
    tiltWest(data.allStones, data.yMax, data.blockersByRow)
    tiltSouth(data.allStones, data.xMax, data.yMax, data.blockersByColumn)
    tiltEast(data.allStones, data.xMax, data.yMax, data.blockersByRow)
  }

  func calcLoad(allStones: [Stone], yMax: Int) -> Int {
    allStones.reduce(0) { $0 + (yMax - $1.y) }
  }

  func getKey(allStones: [Stone], load: Int) -> String {
    let stoneCoords = allStones.sorted {
      if $0.x == $1.x {
        return $0.y < $1.y
      }

      return $0.x < $1.x
    }.map { "\($0.x)|\($0.y)" }.joined(separator: ",")

    return "\(stoneCoords)-\(load)"
  }

  func part1() -> Any {
    let data = loadData()

    tiltNorth(data.allStones, data.xMax, data.blockersByColumn)

    return calcLoad(allStones: data.allStones, yMax: data.yMax)
  }

  func part2() -> Any {
    let data = loadData()
    var cache: [String: Int] = [:]
    var loadByCycle: [Int: Int] = [:]

    var cycles = 0
    var offset = 0
    var length = 0

    while true {
      cycles += 1
      cycle(data: data)

      let load = calcLoad(allStones: data.allStones, yMax: data.yMax)
      let key = getKey(allStones: data.allStones, load: load)

      if cache.keys.contains(key) {
        offset = cache[key]!
        length = cycles - offset
        break
      } else {
        cache[key] = cycles
        loadByCycle[cycles] = load
      }
    }

    print("Offset: \(offset)")
    print("Length: \(length)")

    let remainingCycles = (1_000_000_000 - offset) % length

    return loadByCycle[offset + remainingCycles]!
  }
}

class Stone {
  var x: Int
  var y: Int

  init(x: Int, y: Int) {
    self.x = x
    self.y = y
  }
}

struct Day14Data {
  var yMax: Int
  var xMax: Int
  var blockersByColumn: [Int: [Int]]
  var blockersByRow: [Int: [Int]]
  var allStones: [Stone]
}
