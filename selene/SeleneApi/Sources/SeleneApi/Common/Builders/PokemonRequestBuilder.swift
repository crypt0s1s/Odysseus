//
//  PokemonRequestBuilder.swift
//
//
//  Created by Joshua Sumskas on 7/1/2024.
//

import Foundation
import Stitch

public struct PokemonRequestBuilder: RequestBuilder {
    @Stitch(\.pokemonApiValues) var pokemonApiValues
    
    var relativeUrl: String
    var version: String?

    public init(relativeUrl: String, version: String? = nil) {
        self.relativeUrl = relativeUrl
        self.version = version
    }

    public func build() throws -> URLRequest {
        try RequestVersionedUrlBuilder(
                baseUrl: pokemonApiValues.baseUrl,
                apiVersion: version ?? pokemonApiValues.version,
                relativeUrl: relativeUrl
        )
        .build()
    }
}
