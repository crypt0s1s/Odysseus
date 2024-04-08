//
//  Application+configureShop.swift
//  
//
//  Created by Joshua Sumskas on 17/3/2024.
//

import Vapor

extension Application {
    public func configureShop() async throws {
        migrations.add(ShopItem.Migration())
        migrations.add(ShopItem.AddBasicItemDetailsDescription())
        repositories.register(.shopRepository) { FluentShopRepository($0) }

        try routes()
    }
}
