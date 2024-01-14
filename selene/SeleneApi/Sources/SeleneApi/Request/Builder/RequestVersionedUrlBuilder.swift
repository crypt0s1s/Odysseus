//
//  RequestVersionedUrlBuilder.swift
//  
//
//  Created by Joshua Sumskas on 7/1/2024.
//

import Foundation

public struct RequestVersionedUrlBuilder: RequestBuilder {
    var baseUrl: URL
    var apiVersion: String
    var relativeUrl: String
    
    public init(baseUrl: URL, apiVersion: String, relativeUrl: String) {
        self.baseUrl = baseUrl
        self.apiVersion = apiVersion
        self.relativeUrl = relativeUrl
    }
    
    public func build() throws -> URLRequest {
        let relativeUrl = "\(apiVersion)/\(relativeUrl)"
        
        // If our url cannot be created return a RequestError
        guard let url = URL(string: "\(baseUrl)/\(relativeUrl)") else {
            throw RequestBuilderError.invalidUrl
        }

        return URLRequest(url: url)
    }
}
