//
//  Application+configureAuth.swift
//  
//
//  Created by Joshua Sumskas on 7/1/2024.
//

import JWT
import Vapor

extension Application {
    public func configureAuth() async throws {
        migrations.add(User.Migration())
        
        // MARK: - JWT
        let key = "JOKER" /*Environment.processKey("SECRET")*/
        jwt.signers.use(.hs256(key: key))

        try routes()
    }
}
