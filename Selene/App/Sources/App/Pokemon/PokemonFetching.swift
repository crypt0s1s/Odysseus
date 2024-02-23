//
//  PokemonFetching.swift
//
//
//  Created by Joshua Sumskas on 7/1/2024.
//

import Foundation
import SeleneApi
import Stitch

protocol PokemonFetching: ApiRepository {
    func get(id: Int) async throws -> Pokemon
}

extension DependencyMap {
    private struct PokemonRepositoryKey: DependencyKey {
        static var dependency: any PokemonFetching = PokemonRepository()
    }
    
    var pokemonRepository: any PokemonFetching {
        get { resolve(key: PokemonRepositoryKey.self) }
        set { register(key: PokemonRepositoryKey.self, dependency: newValue) }
    }
}
