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
        _ = try req.auth.require(SessionToken.self)
        return .ok
    }
    
    func boot(with builder: RoutesBuilder) throws {
        let passwordProtected = builder.grouped(User.authenticator(), User.guardMiddleware())
        passwordProtected.post("login", use: login)

        // TODO: has seperate auth requirements for create user. This should only be done through a workflow / service
        // TODO: consider the above todo. Might have a flow to create account through ui and through services.
        // They could probably be the same thing though
        builder.post("users", use: createUser)
    }
    
    private func login(req: Request) throws -> ClientTokenReponse {
        let user = try req.auth.require(User.self)
        let payload = try SessionToken(with: user)
        req.logger.info("login request \(user), \(payload)")
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
