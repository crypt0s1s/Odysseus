//
//  SessionToken.swift
//
//
//  Created by Joshua Sumskas on 9/1/2024.
//

import Vapor
import JWT

// Example JWT payload.
struct SessionToken: Content, Authenticatable, JWTPayload {

    // Constants
    static let expirationTime: TimeInterval = 60 * 15

    // Token Data
    var expiration: ExpirationClaim
    var userId: UUID

    init(userId: UUID) {
        self.userId = userId
        self.expiration = ExpirationClaim(value: Date().addingTimeInterval(SessionToken.expirationTime))
    }

    init(with user: User) throws {
        self.userId = try user.requireID()
        self.expiration = ExpirationClaim(value: Date().addingTimeInterval(SessionToken.expirationTime))
    }

    func verify(using signer: JWTSigner) throws {
        try expiration.verifyNotExpired()
    }
}

struct ClientTokenReponse: Content {
    var token: String
}
