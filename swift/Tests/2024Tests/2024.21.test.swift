import XCTest
@testable import AdventOfCode

final class Year2024Day21Tests: XCTestCase {
  let day = Year2024.Day21(challengeYear: 2024)

  func testPart1() {
    XCTAssertEqual(day.part1() as? Int, 132_532)
  }

  func testPart2() {
    XCTAssertEqual(day.part2() as? Int, 165_644_591_859_332)
  }
}
