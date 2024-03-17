//
//  ShopRepository.swift
//
//
//  Created by Joshua Sumskas on 17/3/2024.
//

import Vapor
import Fluent
import SeleneCore

struct FluentShopRepository: ShopFetching {
    var req: Request
    
    init(_ req: Vapor.Request) {
        self.req = req
    }
    
    func get() async throws -> [ShopItem] {
        return try await ShopItem.query(on: req.db).all()
    }

    func create(_ item: ShopItem) async throws {
        try await item.save(on: req.db)
    }
}

// TODO: can this be done as a macro?
extension FluentRepositoryId {
    static let shopRepository = FluentRepositoryId("shopRepository")
}

extension FluentRepositoryFactory {
    var shopRepository: any ShopFetching {
        guard let result = make(.shopRepository) as? ShopFetching else {
            fatalError("Shop repository is not configured")
        }
        return result
    }
}
