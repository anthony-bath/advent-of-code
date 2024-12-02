import Foundation

extension Year2023 {
  class Broadcaster {
    let outputs: [String]

    init(outputs: [String]) {
      self.outputs = outputs
    }

    func onReceivePulse(type: Int) -> [(Int, String, String)] {
      outputs.map { (type, $0, "broadcaster") }
    }
  }
}
