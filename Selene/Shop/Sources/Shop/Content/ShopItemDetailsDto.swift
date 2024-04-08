//
//  ShopItemDetailsDto.swift
//
//
//  Created by Joshua Sumskas on 8/4/2024.
//

import Fluent
import Vapor

struct ShopItemDetailsDto: Content {
    var id: UUID
    var name: String
    var minPrice: Double
    var maxPrice: Double?
    var imageUrl: String
    var description: String
}
