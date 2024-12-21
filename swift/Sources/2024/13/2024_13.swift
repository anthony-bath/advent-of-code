import Algorithms

extension Year2024 {
  struct Day13: AdventDay {
    var data: String
    var lines: [String]

    func part1() -> Any {
      let expr = #/X[\+|=](?<X>\d+), Y[\+|=](?<Y>\d+)/#
      var machines: [Machine] = []

      for i in stride(from: 0, to: lines.count, by: 4) {
        let buttonAData = lines[i].firstMatch(of: expr)!.output
        let buttonBData = lines[i + 1].firstMatch(of: expr)!.output
        let prizeData = lines[i + 2].firstMatch(of: expr)!.output

        let buttonA = ButtonA(x: Int(buttonAData.X)!, y: Int(buttonAData.Y)!)
        let buttonB = ButtonB(x: Int(buttonBData.X)!, y: Int(buttonBData.Y)!)
        let prize = Geometry.Point(x: Int(prizeData.X)!, y: Int(prizeData.Y)!)

        machines.append(Machine(buttonA: buttonA, buttonB: buttonB, prize: prize))
      }

      var totalCost = 0

      for machine in machines {
        var minCost = Int.max

        for bPresses in stride(from: 100, to: 0, by: -1) {
          for aPresses in stride(from: 0, to: 100, by: 1) {
            let position = Geometry.Point(
              x: aPresses * machine.buttonA.x + bPresses * machine.buttonB.x,
              y: aPresses * machine.buttonA.y + bPresses * machine.buttonB.y
            )

            if position == machine.prize {
              let cost = aPresses * machine.buttonA.cost + bPresses * machine.buttonB.cost
              minCost = min(minCost, cost)
            }

            if position.x > machine.prize.x || position.y > machine.prize.y {
              break
            }
          }
        }

        if minCost < Int.max {
          totalCost += minCost
        }
      }

      return totalCost
    }

    func part2() -> Any {
      let expr = #/X[\+|=](?<X>\d+), Y[\+|=](?<Y>\d+)/#
      var machines: [Machine2] = []

      for i in stride(from: 0, to: lines.count, by: 4) {
        let buttonAData = lines[i].firstMatch(of: expr)!.output
        let buttonBData = lines[i + 1].firstMatch(of: expr)!.output
        let prizeData = lines[i + 2].firstMatch(of: expr)!.output

        let buttonA = ButtonA(x: Int(buttonAData.X)!, y: Int(buttonAData.Y)!)
        let buttonB = ButtonB(x: Int(buttonBData.X)!, y: Int(buttonBData.Y)!)
        let prizeX: Double = 10_000_000_000_000 + Double(prizeData.X)!
        let prizeY: Double = 10_000_000_000_000 + Double(prizeData.Y)!

        machines.append(Machine2(buttonA: buttonA, buttonB: buttonB, prize: (x: prizeX, y: prizeY)))
      }

      var totalCost = 0

      for machine in machines {
        if let (a, b) = Math.solve2x2Equations(
          eq1_coef: (Double(machine.buttonA.x), Double(machine.buttonB.x)),
          eq1_result: machine.prize.x,
          eq2_coef: (Double(machine.buttonA.y), Double(machine.buttonB.y)),
          eq2_result: machine.prize.y
        ) {
          if Math.isWholeNumber(a) && Math.isWholeNumber(b) {
            totalCost += Int(a) * machine.buttonA.cost + Int(b) * machine.buttonB.cost
          }
        }
      }

      return totalCost
    }

    struct ButtonA {
      var x: Int
      var y: Int
      let cost = 3
    }

    struct ButtonB {
      var x: Int
      var y: Int
      let cost = 1
    }

    struct Machine {
      var buttonA: ButtonA
      var buttonB: ButtonB
      var prize: Geometry.Point
    }

    struct Machine2 {
      var buttonA: ButtonA
      var buttonB: ButtonB
      var prize: (x: Double, y: Double)
    }
  }
}
