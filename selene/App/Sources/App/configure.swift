import Vapor
import Fluent
import FluentPostgresDriver
import Stitch
import SeleneAuth

extension Application {
    func configure() async throws {
        self.setupCorsMiddleware()
        self.databases.use(
            .postgres(configuration:
                .init(
                    hostname: "localhost",
                    port: 5432,
                    // TODO: how can I change this username?
                    username: "joshuasumskas",
                    database: "Coeus",
//                  TODO: look into other options for this
                    tls: .prefer(try .init(configuration: .clientDefault))
                )
            ),
            as: .psql
        )
        self.migrations.add(AddImageUrlField(), to: .psql)
        self.repositories.register(.catalogueRepository) { FluentCatalogueRepository($0) }

        // TODO: do this in a better way
        try await SeleneAuth.configure(self)

        try routes()
    }
}
