enum ArrayUtilities {
  // TODO: Add as extension to collections
  static func combinations<T>(of length: Int, from elements: [T]) -> [[T]] {
    if length == 1 {
      return elements.map { [$0] }
    }

    let smallerCombinations = combinations(of: length - 1, from: elements)
    var result: [[T]] = []

    for combination in smallerCombinations {
      for op in elements {
        result.append(combination + [op])
      }
    }

    return result
  }
}

extension Array where Element == [String] {
  func at(_ point: Geometry.Point) -> String? {
    guard point.x >= 0, point.x < count, point.y >= 0, point.y < self[0].count else {
      return nil
    }

    return self[point.y][point.x]
  }
}
