//
//  ShopItem.swift
//
//
//  Created by Joshua Sumskas on 17/3/2024.
//

import Fluent
import Vapor

final class ShopItem: Model, Content {
    static let schema = "shop"

    @ID(key: .id)
    var id: UUID?

    @Field(key: "name")
    var name: String

    @Field(key: "min_price")
    var minPrice: Double
    
    @Field(key: "max_price")
    var maxPrice: Double?

    @Field(key: "image_url")
    var imageUrl: String

    // When this ShopItem was created.
    @Timestamp(key: "created_at", on: .create)
    var createdAt: Date?

    // When this ShopItem was last updated.
    @Timestamp(key: "updated_at", on: .update)
    var updatedAt: Date?

    init() { }

    init(id: UUID? = nil, name: String, minPrice: Double, maxPrice: Double?, imageUrl: String) {
        self.id = id
        self.name = name
        self.minPrice = minPrice
        self.maxPrice = maxPrice
        self.imageUrl = imageUrl
    }
}
