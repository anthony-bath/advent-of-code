import Algorithms

extension Year2024 {
  struct Day09: AdventDay {
    var data: String
    var lines: [String]

    func part1() -> Any {
      var id = 0
      var expanded: [Int] = []
      var empty = 0

      for index in 0 ..< data.count {
        let count = Int(String(data[data.index(data.startIndex, offsetBy: index)]))!

        if index % 2 == 0 {
          expanded += Array(repeating: id, count: count)
          id += 1
        } else {
          expanded += Array(repeating: -1, count: count)
          empty += count
        }
      }

      var left = 0
      var right = expanded.count - 1

      while left < right {
        while expanded[left] != -1 {
          left += 1
        }

        while expanded[right] == -1 {
          right -= 1
        }

        if left < right {
          expanded[left] = expanded[right]
          expanded[right] = -1
        }
      }

      return expanded[0 ..< expanded.count - empty].indices.reduce(
        0,
        { $0 + $1 * expanded[$1] }
      )
    }

    func part2() -> Any {
      var id = 0
      var expanded: [Block] = []
      let nums = data.split(separator: "").map { Int(String($0))! }
      var blockById: [Int: Block] = [:]

      for index in 0 ..< nums.count {
        let size = nums[index]

        if index % 2 == 0 {
          expanded.append(Block(id: id, size: size, type: .file))
          blockById[id] = expanded.last!
          id += 1
        } else if size > 0 {
          expanded.append(Block(id: nil, size: size, type: .empty))
        }
      }

      var attempted: Set<Int> = []

      while true {
        var right = expanded.count - 1

        while right > 0 {
          if expanded[right].type == .empty || attempted.contains(expanded[right].id!) {
            right -= 1
            continue
          }

          break
        }

        if right <= 0 {
          break
        }

        let block = expanded[right]

        attempted.insert(block.id!)

        var left = 0

        while left < right {
          if expanded[left].type == .file {
            left += 1
            continue
          }

          if expanded[left].size < block.size {
            left += 1
            continue
          }

          if expanded[left].size == block.size {
            expanded[left] = Block(id: block.id, size: block.size, type: .file)
            expanded[right] = Block(id: nil, size: block.size, type: .empty)
            break
          }

          let diff = expanded[left].size - block.size
          expanded[left] = Block(id: block.id, size: block.size, type: .file)
          expanded[right] = Block(id: nil, size: block.size, type: .empty)
          expanded.insert(Block(id: nil, size: diff, type: .empty), at: left + 1)
          break
        }
      }

      var total = 0
      var index = 0

      for block in expanded {
        if block.type == .file {
          total += block.id! * Math.sumMtoN(index, index + block.size - 1)
        }

        index += block.size
      }

      return total
    }

    enum BlockType {
      case empty
      case file
    }

    struct Block {
      var id: Int?
      var size: Int
      var type: BlockType
    }
  }
}
