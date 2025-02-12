import Testing
@testable import AdventOfCode

struct Year2024Day24Tests {
  let day = Year2024.Day24(challengeYear: 2024)

  @Test("Day 24, Part 1") func part1() {
    #expect(day.part1() as? Int == 49_430_469_426_918)
  }

  @Test("Day 24, Part 2") func part2() {
    #expect(day.part2() as? String == "fbq,pbv,qff,qnw,qqp,z16,z23,z36")
  }
}
