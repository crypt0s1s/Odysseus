//
//  Application+configureAuth.swift
//  
//
//  Created by Joshua Sumskas on 7/1/2024.
//

import Vapor
import JWT

extension Application {
    public func configureAuth() async throws {
        migrations.add(User.Migration())
        
        // MARK: - JWT
        // TODO: do I want to do this here?
        let secret = Environment.process.SECRET ?? ProcessInfo.processInfo.environment["SECRET"]
        jwt.signers.use(.hs256(key: secret!))

        try routes()
    }
}
