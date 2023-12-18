import Algorithms
import Foundation

struct Day16: AdventDay {
  var data: String
  var lines: [String]

  func evaluate(options: [Beam], grid: [[String]]) -> Int {
    let W = grid[0].count
    let H = grid.count

    func isInside(beam: Beam) -> Bool {
      !(beam.x >= W || beam.x < 0 || beam.y >= H || beam.y < 0)
    }

    var maxEnergized = Int.min

    for option in options {
      var visited = Set<String>()
      var energized = Set<String>()
      var beams = [option]

      visited.insert(option.key())
      energized.insert(option.location())

      while true {
        let before = visited.count

        for beam in beams {
          if !isInside(beam: beam) {
            continue
          }

          let cell = grid[beam.y][beam.x]

          switch cell {
          case ".":
            beam.x += beam.dx
            beam.y += beam.dy

            let key = beam.key()

            if isInside(beam: beam) && !visited.contains(key) {
              visited.insert(key)
              energized.insert(beam.location())
            }

          case "|":
            if beam.dx != 0 {
              let (dx1, dy1) = (0, -1)
              let newBeam = Beam(x: beam.x + dx1, y: beam.y + dy1, dx: dx1, dy: dy1)
              let newKey = newBeam.key()

              if isInside(beam: newBeam) && !visited.contains(newKey) {
                beams.append(newBeam)
                visited.insert(newKey)
                energized.insert(newBeam.location())
              }

              let (dx2, dy2) = (0, 1)
              beam.x += dx2
              beam.y += dy2
              beam.dx = dx2
              beam.dy = dy2

              let key = beam.key()

              if isInside(beam: beam) && !visited.contains(key) {
                visited.insert(key)
                energized.insert(beam.location())
              }
            } else {
              beam.y += beam.dy

              let key = beam.key()

              if isInside(beam: beam) && !visited.contains(key) {
                visited.insert(key)
                energized.insert(beam.location())
              }
            }

          case "\\":
            // (1,0) -> (0,1)
            // (-1,0) -> (0,-1)
            // (0,-1) -> (-1,0)
            // (0,1) -> (1,0)

            if beam.dy == 0 {
              beam.dy = beam.dx
              beam.dx = 0
            } else {
              beam.dx = beam.dy
              beam.dy = 0
            }

            beam.x += beam.dx
            beam.y += beam.dy

            let key = beam.key()

            if isInside(beam: beam) && !visited.contains(key) {
              visited.insert(key)
              energized.insert(beam.location())
            }

          case "/":
            // (1,0) -> (0,-1)
            // (-1,0) -> (0,1)
            // (0,-1) -> (1,0)
            // (0,1) -> (-1,0)

            if beam.dy == 0 {
              beam.dy = -beam.dx
              beam.dx = 0
            } else {
              beam.dx = -beam.dy
              beam.dy = 0
            }

            beam.x += beam.dx
            beam.y += beam.dy

            let key = beam.key()

            if isInside(beam: beam) && !visited.contains(key) {
              visited.insert(key)
              energized.insert(beam.location())
            }

          case "-":
            if beam.dy != 0 {
              let (dx1, dy1) = (-1, 0)
              let newBeam = Beam(x: beam.x + dx1, y: beam.y + dy1, dx: dx1, dy: dy1)
              let newKey = newBeam.key()

              if isInside(beam: newBeam) && !visited.contains(newKey) {
                beams.append(newBeam)
                visited.insert(newKey)
                energized.insert(newBeam.location())
              }

              let (dx2, dy2) = (1, 0)
              beam.x += dx2
              beam.y += dy2
              beam.dx = dx2
              beam.dy = dy2

              let key = beam.key()

              if isInside(beam: beam) && !visited.contains(key) {
                visited.insert(key)
                energized.insert(beam.location())
              }
            } else {
              beam.x += beam.dx

              let key = beam.key()

              if isInside(beam: beam) && !visited.contains(key) {
                visited.insert(key)
                energized.insert(beam.location())
              }
            }

          default:
            fatalError()
          }
        }

        if before == visited.count {
          break
        }
      }

      maxEnergized = max(maxEnergized, energized.count)
    }

    return maxEnergized
  }

  func part1() -> Any {
    let grid = lines.map { $0.map { String($0) }}
    return evaluate(options: [Beam(x: 0, y: 0, dx: 1, dy: 0)], grid: grid)
  }

  func part2() -> Any {
    let grid = lines.map { $0.map { String($0) }}
    let W = grid[0].count
    let H = grid.count

    var options = [Beam]()

    for x in 0 ..< W {
      options.append(Beam(x: x, y: 0, dx: 0, dy: 1))
      options.append(Beam(x: x, y: H - 1, dx: 0, dy: -1))
    }

    for y in 0 ..< grid.count {
      options.append(Beam(x: 0, y: y, dx: 1, dy: 0))
      options.append(Beam(x: W - 1, y: y, dx: -1, dy: 0))
    }

    return evaluate(options: options, grid: grid)
  }
}

class Beam {
  var x: Int
  var y: Int
  var dx: Int
  var dy: Int

  init(x: Int, y: Int, dx: Int, dy: Int) {
    self.x = x
    self.y = y
    self.dx = dx
    self.dy = dy
  }

  func key() -> String {
    "\(x)|\(y)|\(dx)|\(dy)"
  }

  func location() -> String {
    "\(x)|\(y)"
  }
}
