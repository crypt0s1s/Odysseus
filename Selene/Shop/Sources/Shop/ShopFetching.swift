//
//  ShopFetching.swift
//
//
//  Created by Joshua Sumskas on 17/3/2024.
//

import Vapor
import SeleneCore

protocol ShopFetching: FluentRepository {
    func get() async throws -> [ShopItem]
    func getItem(_ id: UUID) async throws -> ShopItem?
    func create(_ item: ShopItem) async throws
}
