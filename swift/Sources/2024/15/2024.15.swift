import Algorithms

extension Year2024 {
  struct Day15: AdventDay {
    var data: String
    var lines: [String]

    func part1() -> Any {
      let sections = data.split(separator: "\n\n")
      var map = sections[0].split(separator: "\n").map { $0.map { String($0) } }
      let commands = sections[1].split(separator: "\n").flatMap { $0.map { String($0) } }
      let W = map[0].count
      let H = map.count

      var robot: Geometry.Point?

      outer: for y in 1 ..< H - 1 {
        for x in 1 ..< W - 1 {
          if map[y][x] == "@" {
            robot = Geometry.Point(x: x, y: y)
            break outer
          }
        }
      }

      guard var robot = robot else { fatalError("Input does not contain a robot (@)") }

      func move(_ direction: Geometry.Direction) {
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
      let sections = data.split(separator: "\n\n")
      var map: [[String]] = sections[0].split(separator: "\n")
        .map { line in
          line.flatMap { char -> [String] in
            switch char {
            case "@": return ["@", "."]
            case "O": return ["[", "]"]
            default: return [String(char), String(char)]
            }
          }
        }

      let commands = sections[1].split(separator: "\n").flatMap { $0.map { String($0) } }
      let W = map[0].count
      let H = map.count

      var robot: Geometry.Point?

      outer: for y in 1 ..< H - 1 {
        for x in 1 ..< W - 1 {
          if map[y][x] == "@" {
            robot = Geometry.Point(x: x, y: y)
            break outer
          }
        }
      }

      guard var robot = robot else { fatalError("Input does not contain a robot (@)") }

      func move(_ direction: Geometry.Direction) {
        let nextPoint: Geometry.Point
        var pushed: [Geometry.Point]? = nil
        var dx = 0
        var dy = 0

        switch direction {
        case .left:
          nextPoint = Geometry.Point(x: robot.x - 1, y: robot.y)
          dx = -1
        case .right:
          nextPoint = Geometry.Point(x: robot.x + 1, y: robot.y)
          dx = 1
        case .up:
          nextPoint = Geometry.Point(x: robot.x, y: robot.y - 1)
          dy = -1
        case .down:
          nextPoint = Geometry.Point(x: robot.x, y: robot.y + 1)
          dy = 1
        }

        switch map[nextPoint.y][nextPoint.x] {
        case ".":
          map[nextPoint.y][nextPoint.x] = "@"
          map[robot.y][robot.x] = "."
          robot = nextPoint

          return

        case "#":
          return

        case "[":
          switch direction {
          case .up:
            pushed = pushVertical(nextPoint, .up).sorted(by: { $0.y < $1.y })
          case .down:
            pushed = pushVertical(nextPoint, .down).sorted(by: { $0.y > $1.y })
          case .right:
            pushed = pushHorizontal(nextPoint, .right).sorted(by: { $0.x > $1.x })
          default:
            fatalError("Should not be able to move left into [")
          }

        case "]":
          switch direction {
          case .up:
            pushed = pushVertical(Geometry.Point(x: nextPoint.x - 1, y: nextPoint.y), .up)
              .sorted(by: { $0.y < $1.y })
          case .down:
            pushed = pushVertical(Geometry.Point(x: nextPoint.x - 1, y: nextPoint.y), .down)
              .sorted(by: { $0.y > $1.y })
          case .left:
            pushed = pushHorizontal(nextPoint, .left).sorted(by: { $0.x < $1.x })
          default:
            fatalError("Should not be able to move right into ]")
          }

        default:
          fatalError("Unknown type: \(map[nextPoint.y][nextPoint.x])")
        }

        if let pushed = pushed, pushed.count > 0 {
          var seen: Set<Geometry.Point> = []

          for point in pushed {
            if seen.contains(point) {
              continue
            }

            seen.insert(point)

            map[point.y + dy][point.x + dx] = map[point.y][point.x]
            map[point.y][point.x] = "."
          }

          map[nextPoint.y][nextPoint.x] = "@"
          map[robot.y][robot.x] = "."
          robot = nextPoint
        }
      }

      func pushVertical(_ point: Geometry.Point,
                        _ direction: Geometry.Direction) -> [Geometry.Point]
      {
        let left: Geometry.Point
        let right: Geometry.Point

        if direction == .up {
          left = Geometry.Point(x: point.x, y: point.y - 1)
          right = Geometry.Point(x: point.x + 1, y: point.y - 1)
        } else {
          left = Geometry.Point(x: point.x, y: point.y + 1)
          right = Geometry.Point(x: point.x + 1, y: point.y + 1)
        }

        if map[left.y][left.x] == "#" || map[right.y][right.x] == "#" {
          return []
        }

        let thisBox = [point, Geometry.Point(x: point.x + 1, y: point.y)]

        if map[left.y][left.x] == "." && map[right.y][right.x] == "." {
          // can push this box
          return thisBox
        }

        if map[left.y][left.x] == "[" && map[right.y][right.x] == "]" {
          // box directly above in line
          let pushed = pushVertical(left, direction)

          if pushed.count > 0 {
            return pushed + thisBox
          } else {
            return []
          }
        }

        if map[left.y][left.x] == "]" && map[right.y][right.x] == "." {
          // box above to the left
          let pushed = pushVertical(Geometry.Point(x: left.x - 1, y: left.y), direction)

          if pushed.count > 0 {
            return pushed + thisBox
          } else {
            return []
          }
        }

        if map[left.y][left.x] == "." && map[right.y][right.x] == "[" {
          // box above/below to the right
          let pushed = pushVertical(right, direction)

          if pushed.count > 0 {
            return pushed + thisBox
          } else {
            return []
          }
        }

        if map[left.y][left.x] == "]" && map[right.y][right.x] == "[" {
          // two boxes above/below
          let pushedLeft = pushVertical(Geometry.Point(x: left.x - 1, y: left.y), direction)
          let pushedRight = pushVertical(right, direction)

          if pushedLeft.count > 0 && pushedRight.count > 0 {
            return pushedLeft + pushedRight + thisBox
          } else {
            return []
          }
        }

        return []
      }

      func pushHorizontal(_ point: Geometry.Point,
                          _ direction: Geometry.Direction) -> [Geometry.Point]
      {
        var points: [Geometry.Point] = []
        var current = point
        let dx = direction == .right ? 2 : -2
        let boxStart = direction == .right ? "[" : "]"

        while true {
          let next = Geometry.Point(x: current.x + dx, y: current.y)

          if map[next.y][next.x] == "#" {
            points = []
            break
          }

          if map[next.y][next.x] == "." {
            points += [current, Geometry.Point(x: current.x + dx / 2, y: current.y)]
            break
          } else if map[next.y][next.x] == boxStart {
            points += [current, Geometry.Point(x: current.x + dx / 2, y: current.y)]
          } else {
            fatalError("Unknown type: \(map[next.y][next.x])")
          }

          current = next
        }

        return points
      }

      func validate() -> Bool {
        for y in 1 ..< H - 1 {
          for x in 2 ..< W - 2 {
            if map[y][x] == "[" && map[y][x + 1] != "]" {
              return false
            }

            if map[y][x] == "]" && map[y][x - 1] != "[" {
              return false
            }
          }
        }

        return true
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

        if !validate() {
          fatalError("Validation failed (single [ or ] found)")
        }
      }

      var sum = 0

      for y in 1 ..< H - 1 {
        for x in 1 ..< W - 1 {
          if map[y][x] == "[" {
            sum += (100 * y) + x
          }
        }
      }

      return sum
    }
  }
}
