//
//  Application+configureAuth.swift
//  
//
//  Created by Joshua Sumskas on 7/1/2024.
//

import Vapor
import JWT

extension Application {
    public func configureAuth(secret: String) async throws {
        migrations.add(User.Migration())
        
        // MARK: - JWT
        // TODO: is there a better way to pass in the secret?
        jwt.signers.use(.hs256(key: secret))

        try routes()
    }
}
