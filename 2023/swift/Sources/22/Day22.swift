import Algorithms
import Foundation

struct Day22: AdventDay {
  var data: String
  var lines: [String]

  func getData() -> ([Brick], [[[String]]]) {
    var (xMin, xMax, yMin, yMax, zMin, zMax) = (
      Int.max,
      Int.min,
      Int.max,
      Int.min,
      Int.max,
      Int.min
    )

    let bricks = lines.map { line -> Brick in
      let parts = line.components(separatedBy: "~")
      let p1 = parts[0].components(separatedBy: ",").map { Int($0)! }
      let p2 = parts[1].components(separatedBy: ",").map { Int($0)! }

      xMin = min(xMin, p1[0], p2[0])
      xMax = max(xMax, p1[0], p2[0])
      yMin = min(yMin, p1[1], p2[1])
      yMax = max(yMax, p1[1], p2[1])
      zMin = min(zMin, p1[2], p2[2])
      zMax = max(zMax, p1[2], p2[2])

      return Brick((p1[0], p1[1], p1[2]), (p2[0], p2[1], p2[2]))
    }.sorted { b1, b2 in
      let b1z = min(b1.p1.2, b1.p2.2)
      let b2z = min(b2.p1.2, b2.p2.2)

      return b1z < b2z
    }

    var space = Array(
      repeating: Array(
        repeating: Array(repeating: ".", count: xMax + 1),
        count: yMax + 1
      ),
      count: zMax + 1
    )

    for brick in bricks {
      drop(brick, &space)
      brick.storeRest()
    }

    return (bricks, space)
  }

  func drop(_ brick: Brick, _ space: inout [[[String]]]) -> Bool {
    var dropped = false

    brick.updateSpace(&space, type: ".")

    while true {
      if brick.p1.2 - 1 >= 1 && brick.p2.2 - 1 >= 1 && brick.points.allSatisfy({ x, y, z in
        space[z - 1][y][x] == "." })
      {
        brick.p1.2 -= 1
        brick.p2.2 -= 1
        dropped = true
      } else {
        break
      }
    }

    brick.updateSpace(&space, type: "#")

    return dropped
  }

  func canDrop(_ brick: Brick, _ space: inout [[[String]]]) -> Bool {
    brick.updateSpace(&space, type: ".")

    let result = brick.p1.2 - 1 >= 1 && brick.p2.2 - 1 >= 1 && brick.points.allSatisfy { x, y, z in
      space[z - 1][y][x] == "."
    }

    brick.updateSpace(&space, type: "#")

    return result
  }

  func part1() -> Any {
    var (bricks, space) = getData()

    var canDisintegrateCount = 0

    for brick1 in bricks {
      var allowsMovement = false

      brick1.updateSpace(&space, type: ".")

      for brick2 in bricks {
        if brick1 === brick2 {
          continue
        }

        if canDrop(brick2, &space) {
          allowsMovement = true
          break
        }
      }

      brick1.updateSpace(&space, type: "#")

      if !allowsMovement {
        canDisintegrateCount += 1
      }
    }

    return canDisintegrateCount
  }

  func part2() -> Any {
    0
  }
}

struct Day22Data {
  var bricks: [Brick]
  var space: [[[String]]]
}
