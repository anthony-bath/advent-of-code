import Algorithms

struct Day18: AdventDay {
  var data: String
  var lines: [String]

  let deltas = ["U": (0, -1), "D": (0, 1), "L": (-1, 0), "R": (1, 0)]

  func shoelace(points: [(Int, Int)]) -> Int {
    var sum = 0

    for i in 0 ..< points.count {
      let (x1, y1) = points[i]
      let (x2, y2) = points[(i + 1) % points.count]
      sum += x1 * y2 - x2 * y1
    }

    return abs(sum / 2)
  }

  func part1() -> Any {
    var points = [(0, 0)]
    var perimeter = 0

    for line in lines {
      let parts = line.components(separatedBy: " ")
      let direction = parts[0]
      let distance = Int(parts[1])!
      let (dx, dy) = deltas[direction]!
      let (x, y) = points.last!

      perimeter += distance
      points.append((x + dx * distance, y + dy * distance))
    }

    return 1 + perimeter / 2 + shoelace(points: points)
  }

  func part2() -> Any {
    var points = [(0, 0)]
    var perimeter = 0

    for line in lines {
      let match = line.firstMatch(of: #/\(#(?<dist>[a-f0-9]{5})(?<dir>\d)\)/#)
      let (_, dist, dir) = match!.output
      let distance = Int(dist, radix: 16)!
      let dirIndex = "0123".firstIndex(of: Character("\(dir)"))!
      let (dx, dy) = deltas[String("RDLU"[dirIndex])]!

      perimeter += distance
      points.append((points.last!.0 + dx * distance, points.last!.1 + dy * distance))
    }

    return 1 + perimeter / 2 + shoelace(points: points)
  }
}
