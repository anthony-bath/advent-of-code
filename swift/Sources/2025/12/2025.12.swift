import Algorithms

extension Year2025 {
  struct Day12: AdventDay {
    let trees: [Tree]
    let gifts: [Int: Gift]

    init(data _: String, lines: [String]) {
      var trees: [Tree] = []
      var gifts: [Int: Gift] = [:]

      var giftLayout: [[String]] = []

      for line in lines {
        if line.isEmpty {
          let id = gifts.count
          gifts[id] = Gift(id, layout: giftLayout)
          giftLayout = []
        } else {
          if line.first?.isNumber ?? false && gifts.count < 6 {
            continue
          }

          if gifts.count < 6 {
            giftLayout.append(line.map { String($0) })
          } else {
            let parts = line.split(separator: ": ")
            let dimensions = parts[0].split(separator: "x").map { Int(String($0))! }
            let gifts = parts[1].split(separator: " ").map { Int(String($0))! }

            trees.append(Tree(dimensions: dimensions, gifts: gifts))
          }
        }
      }

      self.trees = trees
      self.gifts = gifts
    }

    func part1() -> Any {
      var fits = 0

      for tree in trees {
        let requiredArea = tree.gifts.enumerated()
          .reduce(0) { $0 + $1.element * gifts[$1.offset]!.area }

        if requiredArea < tree.area {
          fits += 1
        }
      }

      return fits
    }

    func part2() -> Any {
      0
    }
  }

  struct Tree {
    let width: Int
    let height: Int
    let gifts: [Int]

    init(dimensions: [Int], gifts: [Int]) {
      width = dimensions[0]
      height = dimensions[1]
      self.gifts = gifts
    }

    var area: Int { width * height }
  }

  struct Gift {
    let id: Int
    let layout: [[String]]
    let area: Int

    init(_ id: Int, layout: [[String]]) {
      var area = 0

      for row in layout {
        for cell in row {
          if cell == "#" {
            area += 1
          }
        }
      }

      self.id = id
      self.layout = layout
      self.area = area
    }
  }
}
