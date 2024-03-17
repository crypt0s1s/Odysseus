//
//  ShopItem+migration.swift
//
//
//  Created by Joshua Sumskas on 17/3/2024.
//

import Fluent

extension ShopItem {
    struct Migration: AsyncMigration {
        func prepare(on database: Database) async throws {
            try await database.schema("shop")
                .id()
                .field("name", .string, .required)
                .field("image_url", .string, .required)
                .field("min_price", .double, .required)
                .field("max_price", .double)
                .field("created_at", .datetime, .required)
                .field("updated_at", .datetime, .required)
                .unique(on: "name")
                .create()
        }
        
        func revert(on database: Database) async throws {
            try await database.schema("shop").delete()
        }
    }
}
