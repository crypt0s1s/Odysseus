//
//  User+modelAuthenticatable.swift
//
//
//  Created by Joshua Sumskas on 7/1/2024.
//

import Vapor
import Fluent

extension User: ModelAuthenticatable {
    static let usernameKey = \User.$email
    static let passwordHashKey = \User.$passwordHash

    func verify(password: String) throws -> Bool {
        try Bcrypt.verify(password, created: self.passwordHash)
    }
}
