import Foundation

extension Year2023 {
  class FlipFlop {
    let name: String
    let outputs: [String]
    var on: Bool = false

    init(name: String, outputs: [String]) {
      self.name = name
      self.outputs = outputs
    }

    func onReceivePulse(type: Int) -> [(Int, String, String)] {
      if type == Year2023.Pulse.LOW {
        on.toggle()
        return outputs.map { (self.on ? Year2023.Pulse.HIGH : Year2023.Pulse.LOW, $0, self.name) }
      }

      return []
    }
  }
}
