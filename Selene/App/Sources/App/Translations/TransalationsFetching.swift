//
//  TranslationsFetching.swift
//
//
//  Created by Joshua Sumskas on 7/1/2024.
//

import Foundation
import SeleneApi
import Stitch

protocol TranslationsFetching: ApiRepository {
    func getYodaTranslation(of text: String) async throws -> String
}

extension DependencyMap {
    private struct TranslationsRepositoryKey: DependencyKey {
        static var dependency: any TranslationsFetching = TranslationsRepository()
    }
    
    var translationsRepository: any TranslationsFetching {
        get { resolve(key: TranslationsRepositoryKey.self) }
        set { register(key: TranslationsRepositoryKey.self, dependency: newValue) }
    }
}
