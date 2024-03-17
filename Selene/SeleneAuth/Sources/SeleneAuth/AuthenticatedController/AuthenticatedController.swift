//
//  AuthenticatedController.swift
//
//
//  Created by Joshua Sumskas on 13/1/2024.
//

import Vapor
import SeleneCore

public protocol AuthenticatedController: Controller {
    func bootAuthenticated(with builder: RoutesBuilder) throws
}

public extension AuthenticatedController {
    func boot(routes: RoutesBuilder) throws {
        let group = routes.grouped(PathComponent.init(stringLiteral: group))
        try boot(with: group)
        
        let authenticatedGroup = group.grouped(SessionToken.authenticator(), SessionToken.guardMiddleware())
        try bootAuthenticated(with: authenticatedGroup)
    }
    
    func boot(with builder: RoutesBuilder) throws {}
}
