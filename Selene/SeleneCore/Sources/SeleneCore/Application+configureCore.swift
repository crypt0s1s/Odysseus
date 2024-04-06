//
//  Application+configureCore.swift
//
//
//  Created by Joshua Sumskas on 20/2/2024.
//

import Vapor
import FluentPostgresDriver

extension Application {
    public func configureCore() throws {
        setupCorsMiddleware()
 
        switch self.environment {
            // TODO: add back in
//        case .testing try initialiseTestDatabase()
        default: try initialiseDatabase()
        }
    }
    
    private func initialiseTestDatabase() throws {
        let hostname = Environment.processKey("TEST_DATABASE_HOSTNAME")
        let port = Int(Environment.processKey("TEST_DATABASE_PORT") ?? "")
        let username = Environment.processKey("TEST_DATABASE_USERNAME")
        let databaseName = Environment.processKey("TEST_DATABASE_NAME")
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
    }
    
    private func initialiseDatabase() throws {
        // TODO: Do this in a better way
        let hostname = Environment.processKey("DATABASE_HOSTNAME")
        let port = Int(Environment.processKey("DATABASE_PORT") ?? "")
        let username = Environment.processKey("DATABASE_USERNAME")
        let databaseName = Environment.processKey("DATABASE_NAME")
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
    }
}
