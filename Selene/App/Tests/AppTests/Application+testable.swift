//
//  Application+testable.swift
//
//
//  Created by Joshua Sumskas on 23/2/2024.
//

import XCTVapor
@testable import App

extension Application {
    static func testable() async throws -> Application {
        let app = Application(.testing)

        try await app.configure()
        
        try await app.autoRevert()
        try await app.autoMigrate()

        return app
    }
}
