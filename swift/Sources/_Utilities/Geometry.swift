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
  }
}
