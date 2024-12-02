import Algorithms
import Foundation

extension Year2023 {
  struct Day19: AdventDay {
    var data: String
    var lines: [String]

    let indexByProperty: [String: Int] = [
      "x": 0,
      "m": 1,
      "a": 2,
      "s": 3,
    ]

    func part1() -> Any {
      var workflows: [String: [[String]]] = [:]
      var parts: [[Int]] = []
      var parsingParts = false

      for line in lines {
        if line.isEmpty {
          parsingParts = true
          continue
        }

        if !parsingParts {
          let match = line.firstMatch(of: #/(?<name>\w+)\{(?<ruleList>.*)\}/#)!
          let (_, name, ruleList) = match.output
          var rules: [[String]] = []

          for rule in ruleList.components(separatedBy: ",") {
            if rule.contains(":") {
              let parts = rule.components(separatedBy: ":")
              let prop = "\(parts[0][parts[0].startIndex])"
              let op = "\(parts[0][parts[0].index(parts[0].startIndex, offsetBy: 1)])"
              let value = String(parts[0].suffix(from: parts[0].index(
                parts[0].startIndex,
                offsetBy: 2
              )))

              rules.append([prop, op, value, parts[1]])
            } else {
              rules.append([rule])
            }
          }

          workflows["\(name)"] = rules
        } else {
          parts.append(line.matches(of: #/\d+/#).map { Int($0.output)! })
        }
      }

      func isAccepted(part: [Int], workflowName: String) -> Bool {
        let workflow = workflows[workflowName]!

        for rule in workflow {
          if rule.count == 1 {
            switch rule[0] {
            case "A": return true
            case "R": return false
            default: return isAccepted(part: part, workflowName: rule[0])
            }
          } else {
            let prop = indexByProperty[rule[0]]!
            let op = rule[1]
            let value = Int(rule[2])!
            let target = rule[3]

            var result: Bool = false

            switch op {
            case ">":
              if part[prop] > value {
                result = true
              }
            case "<":
              if part[prop] < value {
                result = true
              }
            default:
              fatalError("Unknown operator \(op)")
            }

            if result {
              switch target {
              case "A": return true
              case "R": return false
              default: return isAccepted(part: part, workflowName: target)
              }
            } else {
              continue
            }
          }
        }

        return false
      }

      return parts.filter { isAccepted(part: $0, workflowName: "in") }
        .reduce(0) { $0 + $1.reduce(0) { $0 + $1 }}
    }

    func part2() -> Any {
      var workflows: [String: [[String]]] = [:]

      for line in lines {
        if line.isEmpty {
          break
        }

        let match = line.firstMatch(of: #/(?<name>\w+)\{(?<ruleList>.*)\}/#)!
        let (_, name, ruleList) = match.output
        var rules: [[String]] = []

        for rule in ruleList.components(separatedBy: ",") {
          if rule.contains(":") {
            let parts = rule.components(separatedBy: ":")
            let prop = "\(parts[0][parts[0].startIndex])"
            let op = "\(parts[0][parts[0].index(parts[0].startIndex, offsetBy: 1)])"
            let value = String(parts[0].suffix(from: parts[0].index(
              parts[0].startIndex,
              offsetBy: 2
            )))

            rules.append([prop, op, value, parts[1]])
          } else {
            rules.append([rule])
          }
        }

        workflows["\(name)"] = rules
      }

      func product(_ ranges: [[Int]]) -> Int {
        ranges.reduce(1) { $0 * ($1[1] - $1[0] + 1) }
      }

      var count = 0

      func countAccepted(workflowName: String, ranges: [[Int]]) {
        let workflow = workflows[workflowName]!
        var thisWorkflowRanges = ranges.map { $0.map { $0 } }

        for rule in workflow {
          if rule.count == 4 {
            let prop = indexByProperty[rule[0]]!
            let op = rule[1]
            let value = Int(rule[2])!
            let result = rule[3]
            let range = thisWorkflowRanges[prop]

            var passingRange = range.map { $0 }
            var failingRange = range.map { $0 }

            switch op {
            case ">":
              passingRange[0] = max(passingRange[0], value + 1)
              passingRange[1] = min(passingRange[1], 4000)
              failingRange[0] = max(failingRange[0], 1)
              failingRange[1] = min(failingRange[1], value)
            case "<":
              passingRange[0] = max(passingRange[0], 1)
              passingRange[1] = min(passingRange[1], value - 1)
              failingRange[0] = max(failingRange[0], value)
              failingRange[1] = min(failingRange[1], 4000)
            default:
              fatalError("Unknown operator \(op)")
            }

            var acceptedRanges = thisWorkflowRanges.map { $0.map { $0 } }
            acceptedRanges[prop] = passingRange
            thisWorkflowRanges[prop] = failingRange

            if result == "A" {
              count += product(acceptedRanges)
            } else if result != "R" {
              countAccepted(workflowName: result, ranges: acceptedRanges)
            }
          } else {
            if rule[0] == "R" {
              break
            } else if rule[0] == "A" {
              count += product(thisWorkflowRanges)
            } else {
              countAccepted(workflowName: rule[0], ranges: thisWorkflowRanges)
            }
          }
        }
      }

      countAccepted(workflowName: "in", ranges: [[1, 4000], [1, 4000], [1, 4000], [1, 4000]])

      return count
    }
  }
}
