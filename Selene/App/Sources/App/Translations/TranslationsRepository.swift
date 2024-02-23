//
//  TranslationsRepository.swift
//
//
//  Created by Joshua Sumskas on 7/1/2024.
//

import Foundation
import SeleneApi

struct TranslationsRepository: TranslationsFetching {
    func getYodaTranslation(of text: String) async throws -> String {
        let res: TranslationResponse = try await perform(
            .get,
            builder: 
                RequestQueryBuilder(
                    queryItems: [URLQueryItem(name: "text", value: text)],
                    builder: TranslationsRequestBuilder(relativeUrl: "yoda.json")
                )
        )
        return res.contents.translated
    }
}

struct TranslationResponse: Codable {
    let success: Success
    let contents: Contents
    
    struct Success: Codable {
        let total: Int
    }
    
    struct Contents: Codable {
        let translated: String
        let text: String
        let translation: String
    }
}
