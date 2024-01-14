//
//  AuthenticationController.swift
//
//
//  Created by Joshua Sumskas on 7/1/2024.
//

import Vapor

// TODO: consider moving this to a different package
struct AuthenticationController: AuthenticatedController {
    var group: String = "auth"
    
    func bootAuthenticated(with builder: RoutesBuilder) throws {
        builder.post("validateLoggedInUser", use: validateLoggedInUser)
    }

    private func validateLoggedInUser(req: Request) throws -> HTTPStatus {
        let sessionToken = try req.auth.require(SessionToken.self)
        print(sessionToken.userId)
        return .ok
    }
    
    func boot(with builder: RoutesBuilder) throws {
        let passwordProtected = builder.grouped(User.authenticator(), User.guardMiddleware())
        passwordProtected.post("login", use: login)
        
        builder.post("users", use: createUser)
    }
    
    private func login(req: Request) throws -> ClientTokenReponse {
        let user = try req.auth.require(User.self)
        let payload = try SessionToken(with: user)
        return ClientTokenReponse(token: try req.jwt.sign(payload))
    }
    
    private func createUser(req: Request) async throws -> User {
        try User.Create.validate(content: req)
        let create = try req.content.decode(User.Create.self)
        guard create.password == create.confirmPassword else {
            throw Abort(.badRequest, reason: "Passwords did not match")
        }
        let user = try User(
            name: create.name,
            email: create.email,
            passwordHash: Bcrypt.hash(create.password)
        )
        try await user.save(on: req.db)
        return user
    }
}
