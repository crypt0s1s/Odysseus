import Vapor
import Stitch

struct CatalogueController: RouteCollection {

    func boot(routes: RoutesBuilder) throws {
        let catalogue = routes.grouped("catalogue")

        catalogue.get(use: getCatalogue)
        catalogue.post(use: createItem)
    }

    func getCatalogue(req: Request) async throws -> [Catalogue] {
        do {
            return try await req.repositories.catalogueRepository.get()
        } catch {
            print("error retrieving catalogue")
        }

        return []
    }

    func createItem(req: Request) async throws -> Catalogue {
        let item = try req.content.decode(Catalogue.self)
        try await req.repositories.catalogueRepository.create(item: item)
        return item
    }
}
