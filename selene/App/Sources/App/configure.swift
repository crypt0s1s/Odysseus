import Vapor
import Fluent
import FluentPostgresDriver
import Stitch
import SeleneAuth

// configures your application
public func configure(_ app: Application) async throws {
    // uncomment to serve files from /Public folder
    // app.middleware.use(FileMiddleware(publicDirectory: app.directory.publicDirectory))

    app.setupCorsMiddleware()
    app.databases.use(
        .postgres(configuration:
            .init(
                hostname: "localhost",
                port: 5432,
                username: "joshuasumskas",
                database: "Coeus",
                // TODO: change this
//                tls: .disable
                tls: .prefer(try .init(configuration: .clientDefault))
            )
        ),
        as: .psql
    )
    app.migrations.add(MyMigration(), to: .psql)
    app.repositories.register(.catalogueRepository) { FluentCatalogueRepository($0) }

    try await SeleneAuth.configure(app)

    try routes(app)
}
