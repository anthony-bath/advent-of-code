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
