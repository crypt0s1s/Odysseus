//
//  CorsMiddleware.swift
//
//
//  Created by Joshua Sumskas on 14/1/2024.
//

import Vapor

// TODO: move to a core package
extension Application {
    func setupCorsMiddleware() {
        // TODO: update
        let corsConfiguration = CORSMiddleware.Configuration(
            allowedOrigin: .all,
            allowedMethods: [.GET, .POST, .PUT, .OPTIONS, .DELETE, .PATCH],
            allowedHeaders: [.accept, .authorization, .contentType, .origin, .xRequestedWith, .userAgent, .accessControlAllowOrigin]
        )
        let cors = CORSMiddleware(configuration: corsConfiguration)
        // cors middleware should come before default error middleware using `at: .beginning`
        self.middleware.use(cors, at: .beginning)
    }
}
