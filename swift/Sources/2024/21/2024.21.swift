import Algorithms

extension Year2024 {
  struct Day21: AdventDay {
    var data: String
    var lines: [String]

    func part1() -> Any {
      let directionalKeypad = DirectionalKeypad()
      let numericKeypad = NumericKeypad()

      let robot1 = Operator(
        keypad: directionalKeypad,
        position: Geometry.Point(x: 2, y: 0),
        child: nil
      )

      let robot2 = Operator(
        keypad: directionalKeypad,
        position: Geometry.Point(x: 2, y: 0),
        child: robot1
      )

      let robot3 = Operator(
        keypad: numericKeypad,
        position: Geometry.Point(x: 2, y: 3),
        child: robot2
      )

      var result = 0

      for line in lines {
        result += robot3.input(line).count * Int(line.prefix(3))!
      }

      return result
    }

    func part2() -> Any {
      0
    }
  }
}
