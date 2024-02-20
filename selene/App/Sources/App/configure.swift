//
//  Application+configure.swift
//
//
//  Created by Joshua Sumskas on 8/1/2024.
//

import Vapor
import Fluent
import Stitch
import SeleneAuth
import SeleneCore
import FluentPostgresDriver

extension Application {
    func configure() async throws {
        configureCore()

        // TODO: find some way to support this through xcode. IDK. a fall back
        let hostname = Environment.process.DATABASE_HOSTNAME ?? ProcessInfo.processInfo.environment["DATABASE_HOSTNAME"]
        let port = Int(Environment.process.DATABASE_PORT ?? ProcessInfo.processInfo.environment["DATABASE_PORT"] ?? "")
        let username = Environment.process.DATABASE_USERNAME ?? ProcessInfo.processInfo.environment["DATABASE_USERNAME"]
        let databaseName = Environment.process.DATABASE_NAME ?? ProcessInfo.processInfo.environment["DATABASE_NAME"]
        // TODO: add password
        databases.use(
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
        migrations.add(AddImageUrlField(), to: .psql)
        repositories.register(.catalogueRepository) { FluentCatalogueRepository($0) }

        // TODO: do this in a better way
        let secret = Environment.process.SECRET ?? ProcessInfo.processInfo.environment["SECRET"]
        try await configureAuth(secret: secret!)

        try routes()
    }
}
