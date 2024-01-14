//
//  routes.swift
//  
//
//  Created by Joshua Sumskas on 8/1/2024.
//

import Vapor

func routes(_ app: Application) throws {
//    try app.register(collection: AuthController())
    try app.register(collection: AuthenticationController())
}
