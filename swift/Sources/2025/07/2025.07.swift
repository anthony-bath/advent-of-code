import Algorithms

extension Year2025 {
  struct Day07: AdventDay {
    let start: Geometry.Point
    var splitters: Set<Geometry.Point>

    let MAX_Y: Int

    init(data _: String, lines: [String]) {
      start = Geometry.Point(x: lines[0].count / 2, y: 0)
      splitters = []
      MAX_Y = lines.count - 1

      for (y, line) in lines.enumerated() {
        for (x, char) in line.enumerated() {
          if char == "^" {
            splitters.insert(Geometry.Point(x: x, y: y))
          }
        }
      }
    }

    func part1() -> Any {
      var beams: Set<Geometry.Point> = [start]
      var splits = 0

      while beams.allSatisfy({ $0.y < MAX_Y }) {
        var nextBeams = Set<Geometry.Point>()

        for var beam in beams {
          if splitters.contains(beam.bottomNeighbor) {
            splits += 1

            // Existing Beam to the left
            beam.x -= 1
            beam.y += 1
            nextBeams.insert(beam)

            // New Beam to the right
            nextBeams.insert(Geometry.Point(x: beam.x + 2, y: beam.y))
          } else {
            beam.y += 1
            nextBeams.insert(beam)
          }
        }

        beams = nextBeams
      }

      return splits
    }

    func part2() -> Any {
      var cache: [Geometry.Point: Int] = [:]

      func traverse(from: Geometry.Point) -> Int {
        if let count = cache[from] {
          return count
        }

        let result: Int

        if from.y == MAX_Y {
          result = 1
        } else if splitters.contains(from.bottomNeighbor) {
          let left = Geometry.Point(x: from.x - 1, y: from.y + 1)
          let right = Geometry.Point(x: from.x + 1, y: from.y + 1)

          result = traverse(from: left) + traverse(from: right)
        } else {
          result = traverse(from: Geometry.Point(x: from.x, y: from.y + 1))
        }

        cache[from] = result
        return result
      }

      return traverse(from: start)
    }
  }
}
