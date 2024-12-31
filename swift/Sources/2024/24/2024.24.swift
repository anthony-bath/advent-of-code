import Algorithms

extension Year2024 {
  struct Gate {
    let label: String
    let in1: String
    let in2: String
    let out: String
    let op: (Int, Int) -> Int

    init(label: String, in1: String, in2: String, out: String, op: @escaping (Int, Int) -> Int) {
      self.label = label
      self.in1 = in1
      self.in2 = in2
      self.out = out
      self.op = op
    }

    init(from gate: Gate, with out: String) {
      label = gate.label
      in1 = gate.in1
      in2 = gate.in2
      self.out = out
      op = gate.op
    }
  }

  struct Day24: AdventDay {
    var wires: [String: Int] = [:]
    var xValues = Array(repeating: 0, count: 45)
    var yValues = Array(repeating: 0, count: 45)
    var connections: [(
      left: String,
      op: (Int, Int) -> Int,
      right: String,
      out: String,
      opLabel: String
    )] = []

    var gatesByOutput: [String: Gate] = [:]

    init(data: String, lines _: [String]) {
      let parts = data.split(separator: "\n\n")
      let expr1 = #/(?<wire>[xy]\d{2}): (?<value>[10])/#

      for input in parts[0].split(separator: "\n") {
        if let match = input.firstMatch(of: expr1) {
          let name = String(match.wire)
          let value = Int(String(match.value))!
          let index = Int(name.dropFirst(1))!

          wires[name] = value

          if name.hasPrefix("x") {
            xValues[index] = value
          } else {
            yValues[index] = value
          }
        }
      }

      let expr2 =
        #/(?<left>[a-z0-9]{3}) (?<op>[A-Z]+) (?<right>[a-z0-9]{3}) -> (?<out>[a-z0-9]{3})/#

      for line in parts[1].split(separator: "\n") {
        if let match = line.firstMatch(of: expr2) {
          let op: (Int, Int) -> Int
          let opLabel: String
          switch match.op {
          case "AND":
            op = { $0 & $1 }
            opLabel = "and"
          case "OR":
            op = { $0 | $1 }
            opLabel = "or"
          case "XOR":
            op = { $0 ^ $1 }
            opLabel = "xor"
          default:
            fatalError()
          }

          connections.append((
            left: String(match.left),
            op: op,
            right: String(match.right),
            out: String(match.out),
            opLabel: opLabel
          ))

          gatesByOutput[String(match.out)] = Gate(
            label: opLabel,
            in1: String(match.left),
            in2: String(match.right),
            out: String(match.out),
            op: op
          )
        }
      }
    }

    func part1() -> Any {
      var wires = self.wires
      var queue: [(
        left: String,
        op: (Int, Int) -> Int,
        right: String,
        out: String,
        opLabel: String
      )] =
        connections

      while !queue.isEmpty {
        let (left, op, right, out, opLabel) = queue.removeFirst()

        let leftValue = wires[left, default: -1]
        let rightValue = wires[right, default: -1]

        if leftValue == -1 || rightValue == -1 {
          queue.append((left, op, right, out, opLabel))
          continue
        }

        wires[out] = op(leftValue, rightValue)
      }

      let result = wires.keys.filter { $0.hasPrefix("z") }
        .sorted { $0 > $1 }
        .map { "\(wires[$0]!)" }
        .joined()

      return Int(result, radix: 2)!
    }

    func part2() -> Any {
      var swaps: [String] = []
      var gates = gatesByOutput

      for num in 0 ..< 45 {
        let name = getName(for: "z", num)
        let result = verifyZBit(name: name, number: num, gates: gates)

        if !result {
          var testSwaps = Set<String>([name])
          testSwaps.formUnion(dependencies(for: name, gates: gates))

          for num2 in num + 1 ..< 45 {
            testSwaps.formUnion(dependencies(for: getName(for: "z", num2), gates: gates))
          }

          outer: for name1 in testSwaps {
            for name2 in testSwaps {
              guard name1 != name2 else { continue }

              let g1 = gates[name1]!
              let g2 = gates[name2]!

              gates[name1] = Gate(from: g2, with: name1)
              gates[name2] = Gate(from: g1, with: name2)

              let result = verifyZBit(name: name, number: num, gates: gates)

              if result {
                swaps.append(contentsOf: [name1, name2])
                break outer
              } else {
                gates[name1] = g1
                gates[name2] = g2
              }
            }
          }
        }
      }
      return swaps.sorted().joined(separator: ",")
    }

    func getName(for input: String, _ number: Int) -> String {
      "\(input)\(String(format: "%02d", number))"
    }

    func dependencies(for name: String, gates: [String: Gate]) -> Set<String> {
      guard let gate = gates[name] else { return [] }

      var result: Set<String> = []

      if !gate.in1.hasPrefix("x") && !gate.in1.hasPrefix("y") {
        result.insert(gate.in1)
        result.formUnion(dependencies(for: gate.in1, gates: gates))
      }

      if !gate.in2.hasPrefix("x") && !gate.in2.hasPrefix("y") {
        result.insert(gate.in2)
        result.formUnion(dependencies(for: gate.in2, gates: gates))
      }

      return result
    }

    func verifyZBit(name: String, number: Int, gates: [String: Gate]) -> Bool {
      guard let gate = gates[name] else { return false }

      if gate.label != "xor" {
        return false
      }

      if number == 0 {
        return [gate.in1, gate.in2].sorted().joined() == "x00y00"
      }

      let scenario1 = verifyIntermediateXOR(name: gate.in1, number: number, gates: gates) &&
        verifyCarryBit(
          name: gate.in2,
          number: number,
          gates: gates
        )

      let scenario2 = verifyIntermediateXOR(name: gate.in2, number: number, gates: gates) &&
        verifyCarryBit(
          name: gate.in1,
          number: number,
          gates: gates
        )

      return scenario1 || scenario2
    }

    func verifyIntermediateXOR(name: String, number: Int, gates: [String: Gate]) -> Bool {
      guard let gate = gates[name] else { return false }

      if gate.label != "xor" {
        return false
      }

      return [gate.in1, gate.in2].sorted()
        .joined() == "\(getName(for: "x", number))\(getName(for: "y", number))"
    }

    func verifyCarryBit(name: String, number: Int, gates: [String: Gate]) -> Bool {
      guard let gate = gates[name] else { return false }

      if number == 1 {
        if gate.label != "and" {
          return false
        }

        return [gate.in1, gate.in2].sorted().joined() == "x00y00"
      }

      if gate.label != "or" {
        return false
      }

      let scenario1 = verifyDirectCarry(name: gate.in1, number: number - 1, gates: gates) &&
        verifyReCarry(
          name: gate.in2,
          number: number - 1,
          gates: gates
        )

      let scenario2 = verifyDirectCarry(name: gate.in2, number: number - 1, gates: gates) &&
        verifyReCarry(
          name: gate.in1,
          number: number - 1,
          gates: gates
        )

      return scenario1 || scenario2
    }

    func verifyDirectCarry(name: String, number: Int, gates: [String: Gate]) -> Bool {
      guard let gate = gates[name] else { return false }

      if gate.label != "and" {
        return false
      }

      return [gate.in1, gate.in2].sorted()
        .joined() == "\(getName(for: "x", number))\(getName(for: "y", number))"
    }

    func verifyReCarry(name: String, number: Int, gates: [String: Gate]) -> Bool {
      guard let gate = gates[name] else { return false }

      if gate.label != "and" {
        return false
      }

      let scenario1 = verifyIntermediateXOR(name: gate.in1, number: number, gates: gates) &&
        verifyCarryBit(
          name: gate.in2,
          number: number,
          gates: gates
        )

      let scenario2 = verifyIntermediateXOR(name: gate.in2, number: number, gates: gates) &&
        verifyCarryBit(
          name: gate.in1,
          number: number,
          gates: gates
        )

      return scenario1 || scenario2
    }

    func generateVerilog() {
      var inputs = Set<String>()
      var outputs = Set<String>()
      var wires: Set<String> = []

      for connection in connections {
        if connection.left.hasPrefix("x") || connection.left.hasPrefix("y") {
          inputs.insert(connection.left)
        }

        if connection.right.hasPrefix("x") || connection.right.hasPrefix("y") {
          inputs.insert(connection.right)
        }

        if connection.out.hasPrefix("z") {
          outputs.insert(connection.out)
        } else {
          wires.insert(connection.out)
        }
      }
      let wireString = Array(wires).sorted().joined(separator: ", ")

      var lines = [
        "module advent(",
        "  input " + Array(inputs).sorted().joined(separator: ", ") + ",",
        "  output " + Array(outputs).sorted().joined(separator: ", "),
        ");",
        "",
        "  wire " + wireString + ";",
        "",
      ]

      var count = 1

      for connection in connections {
        lines.append(
          "  \(connection.opLabel) g\(count)(\(connection.out), \(connection.left), \(connection.right));"
        )
        count += 1
      }

      lines.append("")
      lines.append("endmodule")

      let content = lines.joined(separator: "\n")
      try! content.write(toFile: "2024_24.sv", atomically: true, encoding: .utf8)
    }
  }
}

// qnw <-> qff
// z16 <-> pbv
// z23 <-> qqp
// z36 <-> fbq
