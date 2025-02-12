
import Testing
@testable import AdventOfCode

struct Year2024Day03Tests {
  let day = Year2024.Day03(challengeYear: 2024)

  @Test("Day 3, Part 1") func part1() {
    #expect(day.part1() as? Int == 156_388_521)
  }

  @Test("Day 3, Part 2") func part2() {
    #expect(day.part2() as? Int == 75_920_122)
  }
}
