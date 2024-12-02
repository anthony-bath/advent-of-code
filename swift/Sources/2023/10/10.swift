import Algorithms

extension Year2023 {
  struct Day10: AdventDay {
    var data: String
    var lines: [String]

    func getData() -> (grid: [[String]], start: (x: Int, y: Int)) {
      var start: (x: Int, y: Int)? = nil
      var grid: [[String]] = []

      for (y, line) in lines.enumerated() {
        let row = line.map { String($0) }
        let s = row.firstIndex(of: "S")

        if let s = s {
          start = (x: Int(s), y: y)
        }

        grid.append(row)
      }

      guard let start = start else { fatalError() }

      // Replace Starting Pipe 'S' with actual pipe
      let neighbors = [
        "north": grid[start.y - 1][start.x],
        "south": grid[start.y + 1][start.x],
        "west": grid[start.y][start.x - 1],
        "east": grid[start.y][start.x + 1],
      ]

      for pipe in PIPES {
        let connectors = VALID_CONNECTORS[pipe]!
        let validConnections = ["north", "south", "east", "west"].filter {
          connectors[$0]!.contains(neighbors[$0]!)
        }

        if validConnections.count == 2 {
          grid[start.y][start.x] = pipe
          break
        }
      }

      return (grid: grid, start: start)
    }

    func walkLoop(grid: [[String]], start: (x: Int, y: Int)) -> [(x: Int, y: Int, dir: String)] {
      var connectedPipes = getConnectedPipes(grid: grid, position: (x: start.x, y: start.y))
      let first = connectedPipes[0]
      let last = connectedPipes[1]
      var loop = [(x: start.x, y: start.y, dir: ""), first]

      var current = first

      while !(current.x == last.x && current.y == last.y) {
        connectedPipes = getConnectedPipes(grid: grid, position: (x: current.x, y: current.y))
        current = connectedPipes.first { $0.dir != OPPOSITE[current.dir]! }!
        loop.append(current)
      }

      return loop
    }

    func part1() -> Any {
      let (grid, start) = getData()
      return walkLoop(grid: grid, start: start).count / 2
    }

    func part2() -> Any {
      let (grid, start) = getData()
      let loop = walkLoop(grid: grid, start: start)

      var loopOnlyGrid = (0 ..< grid.count).map { _ in
        [String](repeating: ".", count: grid[0].count)
      }

      for (x, y, _) in loop {
        loopOnlyGrid[y][x] = grid[y][x]
      }

      var area = 0

      func shouldInvert(match: Substring) -> Bool {
        if String(match) == "|" {
          return true
        }

        if let _ = try? #/F-{0,}J/#.wholeMatch(in: match) {
          return true
        }

        if let _ = try? #/L-{0,}7/#.wholeMatch(in: match) {
          return true
        }

        return false
      }

      for y in 0 ..< grid.count {
        var sections: [(start: Int, end: Int, invert: Bool)] = []
        let row = loopOnlyGrid[y].joined()

        for match in row.matches(of: #/(\||F-{0,}7|F-{0,}J|L-{0,}7|L-{0,}J)/#) {
          sections.append((
            start: row.distance(from: row.startIndex, to: match.range.lowerBound),
            end: row.distance(from: row.startIndex, to: match.range.upperBound) - 1,
            invert: shouldInvert(match: match.output.1)
          ))
        }

        var x = 0
        var inside = false

        while x < grid[0].count {
          let match = sections.first { x >= $0.start && x <= $0.end }

          if let match = match {
            if match.invert {
              inside = !inside
            }

            x = match.end + 1
          } else {
            if inside {
              area = area + 1
            }

            x = x + 1
          }
        }
      }

      return area
    }

    func getConnectedPipes(grid: [[String]], position: (x: Int, y: Int)) -> [(
      x: Int,
      y: Int,
      dir: String
    )] {
      let W = grid[0].count
      let H = grid.count
      let (x, y) = position

      let pipe = grid[y][x]
      let connectors = VALID_CONNECTORS[pipe]!
      var connections: [(x: Int, y: Int, dir: String)] = []

      for (dx, dy, dir) in deltas {
        let next = (x: x + dx, y: y + dy)

        guard next.x >= 0 && next.x < W && next.y >= 0 && next.y < H else { continue }

        let nextPipe = grid[next.y][next.x]

        if connectors[dir]!.contains(nextPipe) {
          connections.append((x: next.x, y: next.y, dir: dir))
        }
      }

      return connections
    }

    let deltas = [(-1, 0, "west"), (0, -1, "north"), (1, 0, "east"), (0, 1, "south")]
    let PIPES = ["-", "|", "L", "J", "F", "7"]
    let OPPOSITE = ["east": "west", "west": "east", "north": "south", "south": "north"]
    let VALID_CONNECTORS = [
      "-": ["north": [], "south": [], "west": ["-", "L", "F"], "east": ["-", "7", "J"]],
      "|": ["north": ["|", "7", "F"], "south": ["|", "J", "L"], "west": [], "east": []],
      "J": ["north": ["|", "7", "F"], "south": [], "west": ["-", "L", "F"], "east": []],
      "L": ["north": ["|", "7", "F"], "south": [], "west": [], "east": ["-", "7", "J"]],
      "F": ["north": [], "south": ["|", "J", "L"], "west": [], "east": ["-", "7", "J"]],
      "7": ["north": [], "south": ["|", "J", "L"], "west": ["-", "F", "L"], "east": []],
    ]
  }
}
