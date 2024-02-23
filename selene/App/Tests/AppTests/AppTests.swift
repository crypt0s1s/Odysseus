import XCTVapor

@testable import App

final class AppTests: XCTestCase {
    var app: Application? = nil
    
    // MARK: - Lifecycle
    override func setUp() async throws {
        try await super.setUp()
        self.app = try await Application.testable()
    }
    
    override func tearDownWithError() throws {
        app?.shutdown()
        app = nil
    }
    
    func testGetCatalgoueReturnsAllCatalogues() async throws {
        let app = app!
        
        let testItems = try await [
            Catalogue.create(name: "item 1", price: 123, imageUrl: "abc", on: app.db),
            Catalogue.create(name: "item 2", price: 1.42, imageUrl: "efe", on: app.db),
            Catalogue.create(name: "spike", price: 9324.10, imageUrl: "something", on: app.db),
        ]
        
        try app.test(.GET, "catalogue", afterResponse: { res in
            print(res.body.string)
            XCTAssertEqual(res.status, .ok)
            let items = try res.content.decode([Catalogue].self)
            XCTAssertEqual(items.count, 3)
            XCTAssertEqual(items[0], testItems[0])
            XCTAssertEqual(items[1], testItems[1])
            XCTAssertEqual(items[2], testItems[2])
        })
    }
}
