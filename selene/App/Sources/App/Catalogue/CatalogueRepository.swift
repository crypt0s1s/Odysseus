import Vapor
import Fluent
import SeleneCore

struct FluentCatalogueRepository: CatalogueFetching {
    var req: Request
    
    init(_ req: Vapor.Request) {
        self.req = req
    }
    
    func get() async throws -> [Catalogue] {
        return try await Catalogue.query(on: req.db).all()
    }

    func create(item: Catalogue) async throws {
        try await item.save(on: req.db)
    }
}

// TODO: can this be done as a macro?
public extension FluentRepositoryId {
    static let catalogueRepository = FluentRepositoryId("catalogueRepository")
}

extension FluentRepositoryFactory {
    var catalogueRepository: any CatalogueFetching {
        guard let result = make(.catalogueRepository) as? CatalogueFetching else {
            fatalError("Catalogue repository is not configured")
        }
        return result
    }
}
