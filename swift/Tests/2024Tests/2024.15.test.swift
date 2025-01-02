import XCTest
@testable import AdventOfCode

final class Year2024Day15Tests: XCTestCase {
  let day = Year2024.Day15(challengeYear: 2024)

  func testPart1() {
    XCTAssertEqual(day.part1() as? Int, 1_430_439)
  }

  func testPart2() {
    XCTAssertEqual(day.part2() as? Int, 0)
  }
}
