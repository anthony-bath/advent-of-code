import Algorithms

extension Year2024 {
  struct Day06: AdventDay {
    var grid: [[String]]
    var start: Point

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

      if let start = start {
        self.start = start
      } else {
        fatalError("No start point found")
      }
    }

    func part1() -> Any {
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

      var possibles = 0

      outer: for point in visited {
        if point == start {
          continue
        }

        var current = Position2(x: start.x, y: start.y, direction: .North)
        var currentVisited = Set<Position2>([current])

        while true {
          var next = current.moveForward()

          if next.y < 0 || next.y >= H || next.x < 0 || next.x >= W {
            continue outer
          }

          if grid[next.y][next.x] == "#" || (next.x == point.x && next.y == point.y) {
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

    struct Position2: Hashable {
      var x: Int
      var y: Int
      var direction: Direction

      func turnRight() -> Position2 {
        let newDirection = Direction(rawValue: (direction.rawValue + 90) % 360)!
        return Position2(x: x, y: y, direction: newDirection)
      }

      func moveForward() -> Position2 {
        let nextPoint: Point

        switch direction {
        case .North:
          nextPoint = Point(x: x, y: y - 1)
        case .South:
          nextPoint = Point(x: x, y: y + 1)
        case .East:
          nextPoint = Point(x: x + 1, y: y)
        case .West:
          nextPoint = Point(x: x - 1, y: y)
        }

        return Position2(x: nextPoint.x, y: nextPoint.y, direction: direction)
      }
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
