//
//  ShopController.swift
//
//
//  Created by Joshua Sumskas on 16/3/2024.
//

import Vapor
import Stitch
import SeleneAuth

struct ShopController: AuthenticatedController {
    var group: String = "shop"

    func bootAuthenticated(with builder: any RoutesBuilder) throws {
        // TODO: add in any needed authenticated routes
    }
    
    func boot(with builder: any RoutesBuilder) throws {
        builder.get(use: getShop)
        builder.post(use: createItems)
    }
    
    func getShop(req: Request) async throws -> [ShopItem] {
        try await req.repositories.shopRepository.get()
    }
    
    
    func createItems(req: Request) async throws -> [ShopItem] {
        let items = try req.content.decode([ShopItem].self)
 
        for item in items {
            try await req.repositories.shopRepository.create(item)
        }
        
        // TODO: return 200
        return items
    }
}
