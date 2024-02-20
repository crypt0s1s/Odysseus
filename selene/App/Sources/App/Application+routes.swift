//
//  Application+routes.swift
//
//
//  Created by Joshua Sumskas on 8/1/2024.
//

import Vapor

extension Application {
    func routes() throws {
        try register(collection: CatalogueController())
        try register(collection: PokemonController())
        try register(collection: TranslationsController())
    }
}
