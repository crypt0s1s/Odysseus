//
//  TranslationsApiValues.swift
//
//
//  Created by Joshua Sumskas on 7/1/2024.
//

import Foundation
import Stitch

struct TranslationsApiValues: ApiValues {
    public var baseUrl = URL(string: "https://api.funtranslations.com/translate/")!
    public var version = ""
}

// MARK: - Injection
extension DependencyMap {
    private struct TranslationsApiValuesKey: DependencyKey {
        static var dependency: any ApiValues = TranslationsApiValues()
    }
    
    public var translationsApiValues: any ApiValues {
        get { resolve(key: TranslationsApiValuesKey.self) }
        set { register(key: TranslationsApiValuesKey.self, dependency: newValue) }
    }
}
