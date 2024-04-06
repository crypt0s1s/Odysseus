//
//  TranslationsRequestBuilder.swift
//
//
//  Created by Joshua Sumskas on 7/1/2024.
//

#if canImport(FoundationNetworking)
    import FoundationNetworking
#endif
import Foundation
import Stitch

public struct TranslationsRequestBuilder: RequestBuilder {
    @Stitch(\.translationsApiValues) var apiValues
    
    var relativeUrl: String

    public init(relativeUrl: String) {
        self.relativeUrl = relativeUrl
    }

    public func build() throws -> URLRequest {
        try RequestRelativeUrlBuilder(
                baseUrl: apiValues.baseUrl,
                relativeUrl: relativeUrl
        )
        .build()
    }
}
