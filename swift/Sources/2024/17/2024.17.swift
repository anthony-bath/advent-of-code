import Algorithms
import Foundation

extension Year2024 {
  struct Day17: AdventDay {
    var data: String
    var lines: [String]

    func part1() -> Any {
      let expr = #/\d+/#
      let matches = data.matches(of: expr)

      let registers = ["A": Int(matches[0].0)!, "B": Int(matches[1].0)!, "C": Int(matches[2].0)!]
      let program = matches[3...].map { Int($0.0)! }
      let computer = Computer(registers: registers, program: program)
      let output = computer.run()

      return output.map { "\($0)" }.joined(separator: ",")
    }

    func part2() -> Any {
      let expr = #/\d+/#
      let matches = data.matches(of: expr)

      let program = matches[3...].map { Int($0.0)! }

      func search(aStart: Int, depth: Int) -> Int {
        var worked: [Int] = []

        for a in aStart ... aStart + 7 {
          let computer = Computer(registers: ["A": a, "B": 0, "C": 0], program: program)
          let output = computer.run()

          if output == Array(program[(program.count - depth)...]) {
            if output.count == program.count {
              return a
            }

            let result = search(aStart: a * 8, depth: depth + 1)

            if result != -1 {
              worked.append(result)
            }
          }
        }

        if worked.isEmpty {
          return -1
        }

        return worked.min()!
      }

      return search(aStart: 0, depth: 1)
    }

    class Computer {
      var registers: [String: Int]
      var program: [Int]
      var ip: Int

      init(registers: [String: Int], program: [Int]) {
        self.registers = registers
        self.program = program
        ip = 0
      }

      func run() -> [Int] {
        var output: [Int] = []

        while ip < program.count {
          let instruction = program[ip]
          let operand = program[ip + 1]

          switch instruction {
          case 0: adv(combo: operand)
          case 1: bxl(literal: operand)
          case 2: bst(combo: operand)
          case 3: if !jnz(literal: operand) {
              ip += 2
            }
          case 4: bxc()
          case 5: output.append(out(combo: operand))

          case 6: bdv(combo: operand)
          case 7: cdv(combo: operand)
          default: fatalError("Invalid instruction: \(instruction)")
          }

          if instruction != 3 {
            ip += 2
          }
        }

        return output
      }

      func getCombo(index: Int) -> Int {
        if index <= 3 {
          return index
        }

        switch index {
        case 4: return registers["A"]!
        case 5: return registers["B"]!
        case 6: return registers["C"]!
        default: fatalError("Invalid operand index: \(index)")
        }
      }

      func adv(combo: Int) {
        let numerator = registers["A"]!
        let denominator = Int(pow(Double(2), Double(getCombo(index: combo))))
        let result = numerator / denominator

        registers["A"] = result
      }

      func bdv(combo: Int) {
        let numerator = registers["A"]!
        let denominator = Int(pow(Double(2), Double(getCombo(index: combo))))
        let result = numerator / denominator

        registers["B"] = result
      }

      func cdv(combo: Int) {
        let numerator = registers["A"]!
        let denominator = Int(pow(Double(2), Double(getCombo(index: combo))))
        let result = numerator / denominator

        registers["C"] = result
      }

      func bxl(literal: Int) {
        let result = registers["B"]! ^ literal
        registers["B"] = result
      }

      func bst(combo: Int) {
        let result = getCombo(index: combo) % 8
        registers["B"] = result
      }

      func jnz(literal: Int) -> Bool {
        if registers["A"]! != 0 {
          ip = literal
          return true
        }

        return false
      }

      func bxc() {
        let result = registers["B"]! ^ registers["C"]!
        registers["B"] = result
      }

      func out(combo: Int) -> Int {
        getCombo(index: combo) % 8
      }
    }
  }
}

// 202322348616234
