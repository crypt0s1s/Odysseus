//
//  configure.swift
//  
//
//  Created by Joshua Sumskas on 7/1/2024.
//

import Vapor
// TODO: move this
import Fluent
import JWT

public func configure(_ app: Application) async throws {
    app.migrations.add(User.Migration())
    
    // MARK: - JWT
    // TODO: update the secret
    app.jwt.signers.use(.hs256(key: "secret"))

    try routes(app)
}
