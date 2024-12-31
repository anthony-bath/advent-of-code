import Algorithms

extension Year2024 {
  struct Day06: AdventDay {
    var grid: [[String]]
    var start: Point
    let W: Int
    let H: Int

    init(data _: String, lines: [String]) {
      grid = lines.map { $0.map { String($0) } }

      var start: Point? = nil

      for y in 0 ..< grid.count {
        for x in 0 ..< grid[y].count {
          if grid[y][x] == "^" {
            start = Point(x: x, y: y)
            grid[y][x] = "."
            break
          }
        }
      }

      W = grid[0].count
      H = grid.count

      if let start = start {
        self.start = start
      } else {
        fatalError("No start point found")
      }
    }

    func part1() -> Any {
      var current = Position(point: start, direction: .North)
      var visited = Set<Point>([start])

      while true {
        var next = current.moveForward()

        if next.point.y < 0 || next.point.y >= H || next.point.x < 0 || next.point.x >= W {
          break
        }

        if grid[next.point.y][next.point.x] == "#" {
          next = current.turnRight().moveForward()
        }

        visited.insert(next.point)
        current = next
      }

      return visited.count
    }

    func part2() -> Any {
      var current = Position(point: start, direction: .North)
      var visited = Set<Point>([start])
      let W = grid[0].count
      let H = grid.count

      while true {
        var next = current.moveForward()

        if next.point.y < 0 || next.point.y >= H || next.point.x < 0 || next.point.x >= W {
          break
        }

        if grid[next.point.y][next.point.x] == "#" {
          next = current.turnRight().moveForward()
        }

        visited.insert(next.point)
        current = next
      }

      var possibles = 0

      outer: for point in visited {
        if point == start {
          continue
        }

        var current = Position(point: start, direction: .North)
        var currentVisited = Set<Position>([current])

        while true {
          var next = current.moveForward()

          if next.point.y < 0 || next.point.y >= H || next.point.x < 0 || next.point.x >= W {
            continue outer
          }

          if grid[next.point.y][next.point.x] == "#" ||
            (next.point.x == point.x && next.point.y == point.y)
          {
            next = current.turnRight()
          }

          if currentVisited.contains(next) {
            possibles += 1
            continue outer
          } else {
            currentVisited.insert(next)
          }

          current = next
        }
      }

      return possibles
    }

    enum Direction: Int {
      case North = 0, South = 180, East = 90, West = 270
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
    }
  }
}
