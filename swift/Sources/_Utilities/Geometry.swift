enum Geometry {
  struct Point: Hashable {
    var x: Int
    var y: Int

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
}
