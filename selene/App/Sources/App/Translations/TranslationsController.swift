//
//  TranslationsController.swift
//
//
//  Created by Joshua Sumskas on 7/1/2024.
//

import Vapor
import Stitch
import Foundation

struct TranslationsController: RouteCollection {
    @Stitch(\.translationsRepository) var repository

    func boot(routes: RoutesBuilder) throws {
        let translations = routes.grouped("translations")

        translations.post("yoda", use: translateToYoda)
    }

    func translateToYoda(req: Request) async throws -> String {
        let text = try req.query.get(String.self, at: "text")
        return try await repository.getYodaTranslation(of: text)
    }
}

