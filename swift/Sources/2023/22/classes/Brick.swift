import Foundation

extension Year2023 {
  class Brick {
    var p1: (Int, Int, Int)
    var p2: (Int, Int, Int)

    var p1Rest: (Int, Int, Int)
    var p2Rest: (Int, Int, Int)

    var points: [(Int, Int, Int)] {
      let (x1, y1, z1) = p1
      let (x2, y2, z2) = p2

      var points = [(Int, Int, Int)]()

      for x in x1 ... x2 {
        for y in y1 ... y2 {
          for z in z1 ... z2 {
            points.append((x, y, z))
          }
        }
      }

      return points
    }

    init(_ p1: (Int, Int, Int), _ p2: (Int, Int, Int)) {
      self.p1 = p1
      self.p2 = p2

      p1Rest = p1
      p2Rest = p2
    }

    func storeRest() {
      p1Rest = p1
      p2Rest = p2
    }

    func reset() {
      p1 = p1Rest
      p2 = p2Rest
    }

    func updateSpace(_ space: inout [[[String]]], type: String) {
      for (x, y, z) in points {
        space[z][y][x] = type
      }
    }
  }
}
