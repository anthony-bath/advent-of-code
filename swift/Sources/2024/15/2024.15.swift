import Algorithms

extension Year2024 {
  struct Day15: AdventDay {
    var data: String
    var lines: [String]

    enum Direction {
      case up, down, left, right
    }

    func part1() -> Any {
      let sections = data.split(separator: "\n\n")
      var map = sections[0].split(separator: "\n").map { $0.map { String($0) } }
      let commands = sections[1].split(separator: "\n").flatMap { $0.map { String($0) } }
      let W = map[0].count
      let H = map.count

      var robot: Geometry.Point?

      for y in 1 ..< H - 1 {
        for x in 1 ..< W - 1 {
          if map[y][x] == "@" {
            robot = Geometry.Point(x: x, y: y)
          }
        }
      }

      guard var robot = robot else { fatalError("Input does not contain a robot (@)") }

      func move(_ direction: Direction) {
        let nextPoint: Geometry.Point
        let dx: Int
        let dy: Int

        switch direction {
        case .left:
          nextPoint = Geometry.Point(x: robot.x - 1, y: robot.y)
          dx = -1
          dy = 0
        case .right:
          nextPoint = Geometry.Point(x: robot.x + 1, y: robot.y)
          dx = 1
          dy = 0
        case .up:
          nextPoint = Geometry.Point(x: robot.x, y: robot.y - 1)
          dx = 0
          dy = -1
        case .down:
          nextPoint = Geometry.Point(x: robot.x, y: robot.y + 1)
          dx = 0
          dy = 1
        }

        if map[nextPoint.y][nextPoint.x] == "." {
          map[nextPoint.y][nextPoint.x] = "@"
          map[robot.y][robot.x] = "."
          robot = nextPoint
        } else if map[nextPoint.y][nextPoint.x] == "#" {
          return
        } else if map[nextPoint.y][nextPoint.x] == "O" {
          var boxCount = 0
          var current = nextPoint

          while map[current.y][current.x] == "O" {
            boxCount += 1
            current = Geometry.Point(x: current.x + dx, y: current.y + dy)
          }

          // make sure the cell after the box(es) is empty so we can push the boxes
          guard map[current.y][current.x] == "." else { return }

          // push the boxes
          for _ in 0 ..< boxCount {
            map[current.y][current.x] = "O"
            current = Geometry.Point(x: current.x - dx, y: current.y - dy)
          }

          map[nextPoint.y][nextPoint.x] = "@"
          map[robot.y][robot.x] = "."
          robot = nextPoint

        } else {
          fatalError("Unknown type: \(map[nextPoint.y][nextPoint.x])")
        }
      }

      for command in commands {
        switch command {
        case "<":
          move(.left)
        case ">":
          move(.right)
        case "^":
          move(.up)
        case "v":
          move(.down)
        default:
          fatalError("Unknown command: \(command)")
        }
      }

      var sum = 0

      for y in 1 ..< H - 1 {
        for x in 1 ..< W - 1 {
          if map[y][x] == "O" {
            sum += (100 * y) + x
          }
        }
      }

      return sum
    }

    func part2() -> Any {
      0
    }
  }
}
