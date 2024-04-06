//
//  RequestUrlBuilder.swift
//
//
//  Created by Joshua Sumskas on 6/1/2024.
//

#if canImport(FoundationNetworking)
import FoundationNetworking
#endif
import Foundation

struct RequestUrlBuilder: RequestBuilder {
    let url: String
    
    func build() throws -> URLRequest {
        guard let url = URL(string: url) else { throw RequestBuilderError.invalidUrl }
        
        return URLRequest(url: url)
    }
}
