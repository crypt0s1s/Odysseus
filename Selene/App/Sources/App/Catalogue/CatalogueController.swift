import Vapor
import Stitch

struct CatalogueController: RouteCollection {

    func boot(routes: RoutesBuilder) throws {
        let catalogue = routes.grouped("catalogue")

        catalogue.get(use: getCatalogue)
        catalogue.post(use: createItems)
    }

    func getCatalogue(req: Request) async throws -> [Catalogue] {
        return try await req.repositories.catalogueRepository.get()
    }

    func createItems(req: Request) async throws -> [Catalogue] {
        let items = try req.content.decode([Catalogue].self)
 
        for item in items {
            try await req.repositories.catalogueRepository.create(item: item)
        }

        return items
    }
}
