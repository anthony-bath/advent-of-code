import Algorithms
import Dispatch

extension Year2024 {
  struct Day22: AdventDay {
    var numbers: [Int]

    init(data _: String, lines: [String]) {
      numbers = lines.map { Int($0)! }
    }

    func part1() -> Any {
      var total = 0

      for number in numbers {
        var current = number

        for _ in 1 ... 2000 {
          current = next(from: current)
        }

        total += current
      }

      return total
    }

    func part2() -> Any {
      var totalBySequence = [Sequence: Int]()

      for number in numbers {
        var current = number
        var currentPrice = number % 10
        var sequenceData = [Int]()
        var priceBySequence = [Sequence: Int]()

        for _ in 1 ... 2000 {
          let next = next(from: current)
          let nextPrice = next % 10

          sequenceData.append(nextPrice - currentPrice)

          if sequenceData.count == 4 {
            let sequence = Sequence(from: sequenceData)

            if priceBySequence[sequence] == nil {
              priceBySequence[sequence] = nextPrice
              totalBySequence[sequence, default: 0] += nextPrice
            }

            sequenceData.removeFirst()
          }

          current = next
          currentPrice = nextPrice
        }
      }

      return totalBySequence.values.max()!
    }

    struct Sequence: Hashable {
      let one, two, three, four: Int

      init(from sequence: [Int]) {
        one = sequence[0]
        two = sequence[1]
        three = sequence[2]
        four = sequence[3]
      }
    }

    func mix(number: Int, into: Int) -> Int {
      number ^ into
    }

    func prune(number: Int) -> Int {
      number % 16_777_216
    }

    func next(from number: Int) -> Int {
      var result1 = number * 64
      result1 = mix(number: result1, into: number)
      result1 = prune(number: result1)

      var result2 = result1 / 32
      result2 = mix(number: result2, into: result1)
      result2 = prune(number: result2)

      var result3 = result2 * 2048
      result3 = mix(number: result3, into: result2)
      result3 = prune(number: result3)

      return result3
    }
  }
}
