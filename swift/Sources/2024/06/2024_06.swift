import Algorithms

extension Year2024 {
  struct Day06: AdventDay {
    var grid: [[String]]

    init(data _: String, lines: [String]) {
      grid = lines.map { $0.map { String($0) } }
    }

    func part1() -> Any {
      var start: Point?

      for y in 0 ..< grid.count {
        for x in 0 ..< grid[y].count {
          if grid[y][x] == "^" {
            start = Point(x: x, y: y)
            break
          }
        }
      }

      guard let start = start else { fatalError("No start point found") }

      var queue = [Position(point: start, direction: .North)]
      var visited = Set<Point>([start])
      let W = grid[0].count
      let H = grid.count

      while !queue.isEmpty {
        let current = queue.removeFirst()
        var next = current.moveForward()

        if next.point.y < 0 || next.point.y >= H || next.point.x < 0 || next.point.x >= W {
          continue
        }

        if grid[next.point.y][next.point.x] == "#" {
          next = current.turnRight().moveForward()
        }

        visited.insert(next.point)
        queue.append(next)
      }

      return visited.count
    }

    func part2() -> Any {
      0
    }

    struct Point: Hashable {
      var x: Int
      var y: Int
    }

    struct Position: Hashable {
      var point: Point
      var direction: Direction

      func turnRight() -> Position {
        let newDirection = Direction(rawValue: (direction.rawValue + 90) % 360)!
        return Position(point: point, direction: newDirection)
      }

      func moveForward() -> Position {
        let nextPoint: Point

        switch direction {
        case .North:
          nextPoint = Point(x: point.x, y: point.y - 1)
        case .South:
          nextPoint = Point(x: point.x, y: point.y + 1)
        case .East:
          nextPoint = Point(x: point.x + 1, y: point.y)
        case .West:
          nextPoint = Point(x: point.x - 1, y: point.y)
        }

        return Position(point: nextPoint, direction: direction)
      }

      enum Direction: Int {
        case North = 0, South = 180, East = 90, West = 270
      }
    }
  }
}
