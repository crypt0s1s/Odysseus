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
        builder.get(":id", use: getShopItemDetails)
        builder.post(use: createItems)
    }
    
    func getShop(req: Request) async throws -> [ShopItemDto] {
        try await req
            .repositories
            .shopRepository
            .get()
            .map {
                try $0.mapToShopItemDto()
            }
    }
    
    func getShopItemDetails(req: Request) async throws -> ShopItemDetailsDto {
        guard let id = req.parameters.get("id") else { throw Abort(.badRequest) }
        guard let uuid = UUID(uuidString: id) else { throw Abort(.badRequest) }
        
        let item = try await req
            .repositories
            .shopRepository
            .getItem(uuid)
            .map {
                try $0.mapToShopItemDetailsDto()
            }
        
        guard let item else { throw Abort(.notFound) }
        
        return item
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
