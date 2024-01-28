import Fluent
import Vapor

struct MyMigration: AsyncMigration {
    func prepare(on database: Database) async throws {
        try await database.schema("catalogue")
            .id()
            .field("name", .string, .required)
            .field("price", .double, .required)
            .field("created_at", .datetime, .required)
            .field("updated_at", .datetime, .required)
            .unique(on: "name", "price")
            .create()
    }

    func revert(on database: Database) async throws {
        try await database.schema("catalogue").delete()
    }
}
