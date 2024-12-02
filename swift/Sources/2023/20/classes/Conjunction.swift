import Foundation

extension Year2023 {
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
      memory[input] = Year2023.Pulse.LOW
    }

    func onReceivePulse(type: Int, origin: String) -> [(Int, String, String)] {
      memory[origin] = type
      let allHigh = memory.values.allSatisfy { $0 == Year2023.Pulse.HIGH }

      return outputs.map { (allHigh ? Year2023.Pulse.LOW : Year2023.Pulse.HIGH, $0, self.name) }
    }
  }
}
