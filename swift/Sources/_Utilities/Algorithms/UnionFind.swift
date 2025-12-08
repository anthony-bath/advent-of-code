class UnionFind<T: Hashable> {
  var parent: [T: T] = [:]
  var size: [T: Int] = [:]

  init(_ items: [T]) {
    for item in items {
      parent[item] = item
      size[item] = 1
    }
  }

  func find(_ item: T) -> T {
    if parent[item] != item {
      parent[item] = find(parent[item]!) // Path compression
    }

    return parent[item]!
  }

  func union(_ item1: T, _ item2: T) -> Bool {
    let root1 = find(item1)
    let root2 = find(item2)

    if root1 == root2 {
      return false
    }

    parent[root1] = root2
    size[root2]! += size[root1]!

    return true
  }
}
