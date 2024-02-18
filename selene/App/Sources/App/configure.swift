//
//  Application+configure.swift
//
//
//  Created by Joshua Sumskas on 8/1/2024.
//

import Vapor
import Fluent
import FluentPostgresDriver
import Stitch
import SeleneAuth

extension Application {
    func configure() async throws {
        self.setupCorsMiddleware()

        let hostname = Environment.process.DATABASE_HOSTNAME
        let port = Int(Environment.process.DATABASE_PORT ?? "")
        let username = Environment.process.DATABASE_USERNAME
        let databaseName = Environment.process.DATABASE_NAME
        // TODO: add password
        self.databases.use(
            .postgres(configuration:
                .init(
                    hostname: hostname!,
                    port: port!,
                    username: username!,
                    database: databaseName!,
//                  TODO: look into other options for this
                    tls: .prefer(try .init(configuration: .clientDefault))
                )
            ),
            as: .psql
        )
        self.migrations.add(AddImageUrlField(), to: .psql)
        self.repositories.register(.catalogueRepository) { FluentCatalogueRepository($0) }

        // TODO: do this in a better way
        try await configureAuth(secret: Environment.process.SECRET!)

        try routes()
    }
}
