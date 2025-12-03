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

  static func sumMtoN(_ m: Int, _ n: Int) -> Int {
    (n * (n + 1)) / 2 - (m * (m - 1)) / 2
  }

  static func solve2x2Equations(
    eq1_coef: (Double, Double),
    eq1_result: Double,
    eq2_coef: (Double, Double),
    eq2_result: Double
  ) -> (Double, Double)? {
    let (a1, b1) = eq1_coef
    let (a2, b2) = eq2_coef

    let det = a1 * b2 - a2 * b1

    let a = (eq1_result * b2 - eq2_result * b1) / det
    let b = (eq2_result * a1 - eq1_result * a2) / det

    return (a, b)
  }

  static func isWholeNumber(_ value: Double) -> Bool {
    value.truncatingRemainder(dividingBy: 1) == 0
  }

  static func powInt(_ x: Int, _ y: Int) -> Int {
    Int(pow(Double(x), Double(y)))
  }
}
