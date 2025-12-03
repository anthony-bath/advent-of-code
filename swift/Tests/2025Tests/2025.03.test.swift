import Testing
@testable import AdventOfCode

struct Year2025Day03Tests {
  let day = Year2025.Day03(challengeYear: 2025)

  @Test("Day 3, Part 1") func part1() {
    #expect(day.part1() as? Int == 17142)
  }

  @Test("Day 3, Part 2") func part2() {
    #expect(day.part2() as? Int == 169_935_154_100_102)
  }
}
