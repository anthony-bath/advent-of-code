protocol AdventYear: Sendable {
  static var year: Int { get }
  var days: [any AdventDay] { get }
}

extension AdventYear {
  static var year: Int {
    let typeName = String(reflecting: Self.self)

    guard let i = typeName.lastIndex(where: { !$0.isNumber }),
          let year = Int(typeName[i...].dropFirst())
    else {
      fatalError("Year number not found in type name: \(typeName)")
    }

    return year
  }

  var year: Int {
    Self.year
  }
}
