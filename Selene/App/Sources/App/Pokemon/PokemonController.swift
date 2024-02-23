//
//  PokemonController.swift
//  
//
//  Created by Joshua Sumskas on 7/1/2024.
//

import Vapor
import Stitch
import Foundation

struct PokemonController: RouteCollection {
    @Stitch(\.pokemonRepository) var repository

    func boot(routes: RoutesBuilder) throws {
        let pokemon = routes.grouped("pokemon")

        pokemon.get(use: getPokemon)
    }

    func getPokemon(req: Request) async throws -> Pokemon {
        let id = try req.query.get(Int.self, at: "id")
        return try await repository.get(id: id)
    }
}

enum RequestError: Error {
    case invalidParameters
}
