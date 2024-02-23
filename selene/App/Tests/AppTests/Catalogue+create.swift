//
//  Catalogue+create.swift
//
//
//  Created by Joshua Sumskas on 23/2/2024.
//

import Fluent

@testable import App

extension Catalogue {
    static func create(
        name: String = "Luke",
        price: Double = 23.42,
        imageUrl: String = "someURL",
        on database: Database
    ) async throws -> Catalogue {
        let item = Catalogue(name: name, price: price, imageUrl: imageUrl)
        try await item.save(on: database)
        return item
    }
}
