//
//  Application+configure.swift
//
//
//  Created by Joshua Sumskas on 8/1/2024.
//

import Shop
import Vapor
import Fluent
import Stitch
import SeleneAuth
import SeleneCore

extension Application {
    func configure() async throws {
        // Setup middleware and database
        try configureCore()

        // TODO: move into other modules
        migrations.add(AddImageUrlField(), to: .psql)
        repositories.register(.catalogueRepository) { FluentCatalogueRepository($0) }

        try await configureAuth()
        try await configureShop()

        try routes()
    }
}
