//
//  routes.swift
//  
//
//  Created by Joshua Sumskas on 8/1/2024.
//

import Vapor

func routes(_ app: Application) throws {
    try app.register(collection: AuthenticationController())
    try app.register(collection: ProfileController())
}
