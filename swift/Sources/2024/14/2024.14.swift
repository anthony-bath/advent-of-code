import Algorithms
import Foundation

extension Year2024 {
  struct Day14: AdventDay {
    var robots: [Robot] = []
    let W = 101
    let H = 103

    init(data _: String, lines: [String]) {
      var robots: [Robot] = []
      let expr = #/p=((?<x>\d+),(?<y>\d+)) v=((?<dx>-?\d+),(?<dy>-?\d+))/#

      for line in lines {
        if let match = line.firstMatch(of: expr) {
          robots.append(Robot(
            position: Geometry.Point(x: Int(match.output.x)!, y: Int(match.output.y)!),
            velocity: (dx: Int(match.output.dx)!, dy: Int(match.output.dy)!)
          ))
        } else {
          fatalError("Invalid line: \(line)")
        }
      }

      self.robots = robots
    }

    func part1() -> Any {
      for _ in 1 ... 100 {
        for robot in robots {
          robot.move(W: W, H: H)
        }
      }

      var topLeftCount = 0
      var topRightCount = 0
      var bottomLeftCount = 0
      var bottomRightCount = 0

      for robot in robots {
        if robot.position.x < W / 2, robot.position.y < H / 2 {
          topLeftCount += 1
        } else if robot.position.x < W / 2, robot.position.y > H / 2 {
          bottomLeftCount += 1
        } else if robot.position.x > W / 2, robot.position.y < H / 2 {
          topRightCount += 1
        } else if robot.position.x > W / 2, robot.position.y > H / 2 {
          bottomRightCount += 1
        }
      }

      return topLeftCount * topRightCount * bottomLeftCount * bottomRightCount
    }

    func part2() -> Any {
      for robot in robots {
        robot.reset()
      }

      // var frames: [String] = []

      // for _ in 0 ... 7500 {
      //   var grid = Array(repeating: Array(repeating: ".", count: W), count: H)

      //   for robot: Year2024.Day14.Robot in robots {
      //     robot.move(W: W, H: H)
      //     grid[robot.position.y][robot.position.x] = "#"
      //   }

      //   frames.append(grid.map { $0.joined() }.joined(separator: "\n"))
      // }

      // try await createVideoFromFrames(frames, outputURL: URL(fileURLWithPath: "output.mov"))

      // I solved this one by generating a video with the code above.
      // 1 Frame = 1 Second of robot movement.
      // The christmas tree appears at Frame 7412 (index 7411)
      // The robot reset is necessary as it's the same robot instances from part 1
      // Need to add `async throws` to the function signature to be able to run the video code

      return 7412
    }

    class Robot {
      var initialPosition: Geometry.Point
      var position: Geometry.Point
      var velocity: (dx: Int, dy: Int)

      init(position: Geometry.Point, velocity: (dx: Int, dy: Int)) {
        initialPosition = position
        self.position = position
        self.velocity = velocity
      }

      func move(W: Int, H: Int) {
        var nextX = position.x + velocity.dx

        if nextX < 0 {
          nextX = W + nextX
        } else if nextX >= W {
          nextX = nextX - W
        }

        var nextY = position.y + velocity.dy

        if nextY < 0 {
          nextY = H + nextY
        } else if nextY >= H {
          nextY = nextY - H
        }

        position = Geometry.Point(x: nextX, y: nextY)
      }

      func reset() {
        position = initialPosition
      }
    }
  }
}
