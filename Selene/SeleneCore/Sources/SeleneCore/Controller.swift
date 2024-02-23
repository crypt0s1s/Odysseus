//
//  Controller.swift
//
//
//  Created by Joshua Sumskas on 13/1/2024.
//

import Vapor

public protocol Controller: RouteCollection {
    var group: String { get }
    
    func boot(with builder: RoutesBuilder) throws
}

extension Controller {
    func boot(routes: RoutesBuilder) throws {
        let group = routes.grouped(PathComponent.init(stringLiteral: group))
        try boot(with: group)
    }
}
