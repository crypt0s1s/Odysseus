//
//  PokemonRepository.swift
//
//
//  Created by Joshua Sumskas on 7/1/2024.
//

import Foundation
import SeleneApi

struct PokemonRepository: PokemonFetching {
    func get(id: Int) async throws -> Pokemon {
        try await perform(
            .get,
            builder: PokemonRequestBuilder(relativeUrl: "pokemon/\(id)/")
        )
    }
}
