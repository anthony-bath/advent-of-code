import XCTest
@testable import AdventOfCode

final class Year2024Day07Tests: XCTestCase {
  let day = Year2024.Day07(challengeYear: 2024)

  func testPart1() {
    XCTAssertEqual(day.part1() as? Int, 6_083_020_304_036)
  }

  func testPart2() {
    XCTAssertEqual(day.part2() as? Int, 59_002_246_504_791)
  }
}
