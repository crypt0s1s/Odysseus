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
 
        if self.environment == .testing {
            try initialiseTestDatabase()
        } else {
            try initialiseDatabase()
        }
    }
    
    private func initialiseTestDatabase() throws {
        let hostname = Environment.process.TEST_DATABASE_HOSTNAME ?? ProcessInfo.processInfo.environment["TEST_DATABASE_HOSTNAME"]
        let port = Int(Environment.process.TESTDATABASE_PORT ?? ProcessInfo.processInfo.environment["TEST_DATABASE_PORT"] ?? "")
        let username = Environment.process.TEST_DATABASE_USERNAME ?? ProcessInfo.processInfo.environment["TEST_DATABASE_USERNAME"]
        let databaseName = Environment.process.TEST_DATABASE_NAME ?? ProcessInfo.processInfo.environment["TEST_DATABASE_NAME"]
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
    }
}
