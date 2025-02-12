
import Testing
@testable import AdventOfCode

struct Year2024Day02Tests {
  let day = Year2024.Day02(challengeYear: 2024)

  @Test("Day 2, Part 1") func part1() {
    #expect(day.part1() as? Int == 282)
  }

  @Test("Day 2, Part 2") func part2() {
    #expect(day.part2() as? Int == 349)
  }
}
