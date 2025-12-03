import Testing
@testable import AdventOfCode

struct Year2025Day02Tests {
  let day = Year2025.Day02(challengeYear: 2025)

  @Test("Day 2, Part 1") func part1() {
    #expect(day.part1() as? Int == 55_916_882_972)
  }

  @Test("Day 2, Part 2") func part2() {
    #expect(day.part2() as? Int == 76_169_125_915)
  }
}
