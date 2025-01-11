import XCTest
@testable import AdventOfCode

final class Year2024Day20Tests: XCTestCase {
  let day = Year2024.Day20(challengeYear: 2024)

  func testPart1() {
    XCTAssertEqual(day.part1() as? Int, 1197)
  }

  func testPart2() {
    XCTAssertEqual(day.part2() as? Int, 944_910)
  }
}
