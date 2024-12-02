import Foundation

enum Math {
  static func gcd(_ numbers: [Int]) -> Int {
    guard let first = numbers.first, numbers.count > 1 else {
      return numbers.first ?? 0
    }

    var x = first
    var y = numbers[1]

    var remainingNumbers = Array(numbers.dropFirst(2))

    while y != 0 {
      let temp = y
      y = x % y
      x = temp
    }

    remainingNumbers.insert(x, at: 0)

    return gcd(remainingNumbers)
  }

  static func lcm(_ numbers: [Int]) -> Int {
    guard numbers.count > 1 else {
      return numbers.first ?? 0
    }

    var result = numbers[0]
    for i in 1 ..< numbers.count {
      result = (result * numbers[i]) / gcd([result, numbers[i]])
    }
    return result
  }
}
