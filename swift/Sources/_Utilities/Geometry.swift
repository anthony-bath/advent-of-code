enum Geometry {
  struct Point: Hashable {
    var x: Int
    var y: Int

    func add(_ delta: (dx: Int, dy: Int)) -> Point {
      Point(x: x + delta.dx, y: y + delta.dy)
    }

    func diff(_ other: Point) -> (dx: Int, dy: Int) {
      (x - other.x, y - other.y)
    }

    func manhattanDistance(from other: Point) -> Int {
      abs(x - other.x) + abs(y - other.y)
    }

    var cardinalNeighbors: [Point] {
      [
        Point(x: x - 1, y: y),
        Point(x: x + 1, y: y),
        Point(x: x, y: y - 1),
        Point(x: x, y: y + 1),
      ]
    }

    var adjacentNeighbors: [Point] {
      [
        Point(x: x - 1, y: y - 1),
        Point(x: x, y: y - 1),
        Point(x: x + 1, y: y - 1),
        Point(x: x - 1, y: y),
        Point(x: x + 1, y: y),
        Point(x: x - 1, y: y + 1),
        Point(x: x, y: y + 1),
        Point(x: x + 1, y: y + 1),
      ]
    }

    var topLeftNeighbor: Point {
      Point(x: x - 1, y: y - 1)
    }

    var topRightNeighbor: Point {
      Point(x: x + 1, y: y - 1)
    }

    var bottomLeftNeighbor: Point {
      Point(x: x - 1, y: y + 1)
    }

    var bottomRightNeighbor: Point {
      Point(x: x + 1, y: y + 1)
    }

    var topNeighbor: Point {
      Point(x: x, y: y - 1)
    }

    var bottomNeighbor: Point {
      Point(x: x, y: y + 1)
    }

    var leftNeighbor: Point {
      Point(x: x - 1, y: y)
    }

    var rightNeighbor: Point {
      Point(x: x + 1, y: y)
    }
  }

  enum Direction: Int, CaseIterable {
    case up = 0
    case right = 1
    case down = 2
    case left = 3
  }
}
