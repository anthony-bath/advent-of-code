
import XCTest
@testable import AdventOfCode

final class Year2024Day03Tests: XCTestCase {
  let day = Year2024.Day03(challengeYear: 2024)

  func testPart1() {
    XCTAssertEqual(day.part1() as? Int, 156_388_521)
  }

  func testPart2() {
    XCTAssertEqual(day.part2() as? Int, 75_920_122)
  }
}
