import XCTest
@testable import AdventOfCode

final class Year2024Day09Tests: XCTestCase {
  let day = Year2024.Day09(challengeYear: 2024)

  func testPart1() async throws {
    XCTAssertEqual(day.part1() as? Int, 6_367_087_064_415)
  }

  func testPart2() {
    XCTAssertEqual(day.part2() as? Int, 6_390_781_891_880)
  }
}
