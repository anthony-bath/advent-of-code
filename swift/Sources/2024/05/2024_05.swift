import Algorithms

extension Year2024 {
  struct Day05: AdventDay {
    var comesBefore: [Int: Set<Int>]
    var comesAfter: [Int: Set<Int>]
    var sortedUpdates: [[Int]]
    var unsortedUpdates: [[Int]]

    init(data _: String, lines: [String]) {
      var parsingRules = true
      var comesBefore = [Int: Set<Int>]()
      var comesAfter = [Int: Set<Int>]()
      var updates = [[Int]]()
      var sortedUpdates = [[Int]]()
      var unsortedUpdates = [[Int]]()

      for line in lines {
        if line.isEmpty {
          parsingRules = false
        } else if parsingRules {
          let parts = line.split(separator: "|").map { Int($0)! }
          let before = parts[0]
          let after = parts[1]

          comesBefore[after, default: []].insert(before)
          comesAfter[before, default: []].insert(after)
        } else {
          updates.append(line.split(separator: ",").map { Int($0)! })
        }
      }

      for update in updates {
        var sorted = true

        for i in 0 ..< update.count {
          let current = update[i]
          let before = comesBefore[current] ?? []

          if update[(i + 1)...].allSatisfy({ !before.contains($0) }) {
            sorted = true
          } else {
            sorted = false
            break
          }
        }

        if sorted {
          sortedUpdates.append(update)
        } else {
          unsortedUpdates.append(update)
        }
      }

      self.comesBefore = comesBefore
      self.comesAfter = comesAfter
      self.sortedUpdates = sortedUpdates
      self.unsortedUpdates = unsortedUpdates
    }

    func part1() -> Any {
      var total = 0

      for update in sortedUpdates {
        total += update[update.count / 2]
      }

      return total
    }

    func part2() -> Any {
      var total = 0

      for update in unsortedUpdates {
        let sortedUpdate = update
          .sorted(by: {
            comesAfter[$0]?.contains($1) ?? false || comesBefore[$1]?.contains($0) ?? false
          })

        total += sortedUpdate[sortedUpdate.count / 2]
      }

      return total
    }
  }
}
