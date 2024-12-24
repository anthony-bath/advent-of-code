import XCTest
@testable import AdventOfCode

final class Year2024Day14Tests: XCTestCase {
  let day = Year2024.Day14(challengeYear: 2024)

  func testPart1() {
    XCTAssertEqual(day.part1() as? Int, 217_328_832)
  }

  func testPart2() {
    XCTAssertEqual(day.part2() as? Int, 7412)
  }
}
