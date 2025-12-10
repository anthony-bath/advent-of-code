import Algorithms

extension Year2025 {
  struct Day09: AdventDay {
    var tiles: [Geometry.Point]

    init(data _: String, lines: [String]) {
      tiles = lines.map { Geometry.Point($0.split(separator: ",").map { Int(String($0))! }) }
    }

    func part1() -> Any {
      var max = 0

      for t1 in tiles {
        for t2 in tiles {
          guard t1 != t2 else { continue }

          let area = (1 + abs(t2.y - t1.y)) * (1 + abs(t2.x - t1.x))

          if area > max {
            max = area
          }
        }
      }

      return max
    }

    func part2() -> Any {
      let boundary = Geometry.Polygon(tiles)
      var outside = Set<Geometry.Point>()
      var max = 0

      for i in stride(from: 0, to: tiles.count - 1, by: 1) {
        for j in stride(from: i + 1, to: tiles.count, by: 1) {
          let t1 = tiles[i]
          let t2 = tiles[j]

          guard t1.x != t2.x && t1.y != t2.y else { continue }

          let t3 = Geometry.Point(x: t1.x, y: t2.y)
          let t4 = Geometry.Point(x: t2.x, y: t1.y)

          guard !outside.contains(t3) && !outside.contains(t4) else { continue }

          guard boundary.contains(t3) else {
            outside.insert(t3)
            continue
          }

          guard boundary.contains(t4) else {
            outside.insert(t4)
            continue
          }

          let rect = Geometry.Rectangle(corners: [t1, t2, t3, t4])

          if boundary.contains(rectangle: rect) {
            if rect.area > max {
              max = rect.area
            }
          }
        }
      }

      return max
    }
  }
}
