//
//  PokemonApiValues.swift
//
//
//  Created by Joshua Sumskas on 7/1/2024.
//

import Foundation
import Stitch

struct PokemonApiValues: ApiValues {
    public var baseUrl = URL(string: "https://pokeapi.co/api")!
    public var version = "v2"
}

// MARK: - Injection
extension DependencyMap {
    private struct PokemonApiValuesKey: DependencyKey {
        static var dependency: any ApiValues = PokemonApiValues()
    }
    
    public var pokemonApiValues: any ApiValues {
        get { resolve(key: PokemonApiValuesKey.self) }
        set { register(key: PokemonApiValuesKey.self, dependency: newValue) }
    }
}
