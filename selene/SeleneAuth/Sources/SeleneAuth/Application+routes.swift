//
//  Application+routes.swift
//  
//
//  Created by Joshua Sumskas on 8/1/2024.
//

import Vapor

extension Application {
    func routes() throws {
        try self.register(collection: AuthenticationController())
        try self.register(collection: ProfileController())
    }
}
