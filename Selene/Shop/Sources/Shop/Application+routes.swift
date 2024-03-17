//
//  Application+routes.swift
//
//
//  Created by Joshua Sumskas on 17/3/2024.
//

import Vapor

extension Application {
    func routes() throws {
        try register(collection: ShopController())
    }
}
