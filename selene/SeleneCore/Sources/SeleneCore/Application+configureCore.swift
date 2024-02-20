//
//  Application+configureCore.swift
//
//
//  Created by Joshua Sumskas on 20/2/2024.
//

import Vapor

extension Application {
    public func configureCore() {
        setupCorsMiddleware()
    }
}
