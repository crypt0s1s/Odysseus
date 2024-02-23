import Stitch
import Vapor
import SeleneCore

protocol CatalogueFetching: FluentRepository {
    func get() async throws -> [Catalogue]
    func create(item: Catalogue) async throws
}
