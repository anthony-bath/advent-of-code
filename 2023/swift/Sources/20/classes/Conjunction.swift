import Foundation

class Conjunction {
  let name: String
  var inputs: [String] = []
  let outputs: [String]
  var memory: [String: Int] = [:]

  init(name: String, outputs: [String]) {
    self.name = name
    self.outputs = outputs
  }

  func addInput(input: String) {
    inputs.append(input)
    memory[input] = Pulse.LOW
  }

  func onReceivePulse(type: Int, origin: String) -> [(Int, String, String)] {
    memory[origin] = type
    let allHigh = memory.values.allSatisfy { $0 == Pulse.HIGH }

    return outputs.map { (allHigh ? Pulse.LOW : Pulse.HIGH, $0, self.name) }
  }
}
