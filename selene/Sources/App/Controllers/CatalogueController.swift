import Vapor

struct CatalogueController: RouteCollection {
    var items: [CatalogueItem] = 
        [
            .init(name: "Coffee Beans 1kg", price: 100.92),
            .init(name: "Coffee Beans 2kg", price: 200.92),
        ]

    func boot(routes: RoutesBuilder) throws {
        let catalogue = routes.grouped("catalogue")

        catalogue.get(use: getCatalogue)

        // let todos = routes.grouped("todos")
        // todos.get(use: index)
        // todos.post(use: create)

        // todos.group(":id") { todo in
        //     todo.get(use: show)
        //     todo.put(use: update)
        //     todo.delete(use: delete)
        // }
    }

    func getCatalogue(req: Request) async throws -> [CatalogueItem] { items }

    func createItem(req: Request) async throws -> CatalogueItem {
        let item = try req.content.decode(CatalogueItem.self)
        return item
    }
}

struct CatalogueItem: Content {
    var id = UUID()
    var name: String
    var price: Double
}

