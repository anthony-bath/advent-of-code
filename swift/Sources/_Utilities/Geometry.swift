import Foundation

enum Geometry {
  struct Point: Hashable {
    var x: Int
    var y: Int

    init(x: Int, y: Int) {
      self.x = x
      self.y = y
    }

    init(_ coords: [Int]) {
      x = coords[0]
      y = coords[1]
    }

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

  struct Point3D: Hashable {
    var x: Int
    var y: Int
    var z: Int

    init(_ x: Int, _ y: Int, _ z: Int) {
      self.x = x
      self.y = y
      self.z = z
    }

    init(_ coords: [Int]) {
      x = coords[0]
      y = coords[1]
      z = coords[2]
    }

    func distance(from: Point3D) -> Double {
      let xPortion = pow(Double(x - from.x), 2)
      let yPortion = pow(Double(y - from.y), 2)
      let zPortion = pow(Double(z - from.z), 2)

      return sqrt(xPortion + yPortion + zPortion)
    }

    func toString() -> String {
      "\(x), \(y), \(z)"
    }
  }

  struct Edge {
    let start: Point
    let end: Point

    var isHorizontal: Bool { start.y == end.y }
    var isVertical: Bool { start.x == end.x }
    var minY: Int { min(start.y, end.y) }
    var maxY: Int { max(start.y, end.y) }
    var minX: Int { min(start.x, end.x) }
    var maxX: Int { max(start.x, end.x) }

    func intersects(with other: Edge) -> Bool {
      if isHorizontal, other.isVertical {
        // Horizontal self crosses vertical other
        let y = start.y
        let x = other.start.x

        // Check if intersection point is strictly inside both segments
        return minX < x && x < maxX && other.minY < y && y < other.maxY
      }

      if isVertical, other.isHorizontal {
        // Vertical self crosses horizontal other
        let x = start.x
        let y = other.start.y

        return other.minX < x && x < other.maxX &&
          minY < y && y < maxY
      }

      // Parallel edges (both horizontal or both vertical) don't cross
      return false
    }
  }

  struct Polygon {
    let points: [Point]
    let edges: [Edge]
    let horizontalEdges: [Edge]
    let verticalEdges: [Edge]

    init(_ points: [Point]) {
      self.points = points

      var edges: [Edge] = []

      for i in 1 ..< points.count {
        edges.append(Edge(start: points[i - 1], end: points[i]))
      }

      edges.append(Edge(start: points.last!, end: points.first!))

      self.edges = edges
      horizontalEdges = edges.filter { $0.isHorizontal }
      verticalEdges = edges.filter { $0.isVertical }
    }

    func contains(_ point: Point) -> Bool {
      if points.contains(point) {
        return true
      }

      var intersections = 0

      for edge in verticalEdges {
        if edge.start.x == point.x && (point.y > edge.minY && point.y < edge.maxY) {
          return true
        }

        // has to be to the right to count for ray casting intersection
        guard edge.start.x > point.x else { continue }

        if point.y >= edge.minY && point.y < edge.maxY {
          intersections += 1
        }
      }

      return intersections % 2 == 1
    }

    func contains(rectangle: Rectangle) -> Bool {
      for rectEdge in rectangle.edges {
        for polygonEdge in edges {
          if rectEdge.intersects(with: polygonEdge) {
            return false
          }
        }
      }

      return true
    }
  }

  struct Rectangle {
    let corners: [Point]
    let edges: [Edge]
    let area: Int

    init(corners: [Point]) {
      self.corners = corners.sorted { $0.x == $1.x ? $0.y < $1.y : $0.x < $1.x }

      edges = [
        Edge(start: corners[0], end: corners[2]),
        Edge(start: corners[2], end: corners[3]),
        Edge(start: corners[3], end: corners[1]),
        Edge(start: corners[1], end: corners[0]),
      ]

      let width = 1 + self.corners[3].x - self.corners[0].x
      let height = 1 + self.corners[3].y - self.corners[0].y

      area = width * height
    }
  }

  enum Direction: Int, CaseIterable {
    case up = 0
    case right = 1
    case down = 2
    case left = 3
  }
}
