//
//  ProfileController.swift
//
//
//  Created by Joshua Sumskas on 11/2/2024.
//

import Vapor

struct ProfileController: AuthenticatedController {
    // TODO: move to a different package
    var group: String = "profile"
    
    func bootAuthenticated(with builder: RoutesBuilder) throws {
        builder.get(use: getProfile)
        builder.post("validateLoggedInUser", use: validateLoggedInUser)
    }

    private func getProfile(req: Request) async throws -> Profile {
        let sessionToken = try req.auth.require(SessionToken.self)
        guard let user = try await User.find(sessionToken.userId, on: req.db) else {
            throw Abort(.notFound)
        }
 
        return try user.toProfile()
    }
    
    private func validateLoggedInUser(req: Request) throws -> HTTPStatus {
        _ = try req.auth.require(SessionToken.self)
        return .ok
    }
}

extension User {
    func toProfile() throws -> Profile {
        let id = try self.requireID().uuidString

        return Profile(
            id: id,
            displayName: self.name,
            // TODO: add full name var
            fullName: self.name,
            email: self.email
        )
    }
}

struct Profile: Content {
    let id: String
    let displayName: String
    let fullName: String
    let email: String
}
