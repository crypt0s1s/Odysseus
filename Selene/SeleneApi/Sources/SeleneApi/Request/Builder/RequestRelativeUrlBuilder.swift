//
//  RequestRelativeUrlBuilder.swift
//  
//
//  Created by Joshua Sumskas on 7/1/2024.
//

#if canImport(FoundationNetworking)
import FoundationNetworking
#endif
import Foundation

struct RequestRelativeUrlBuilder: RequestBuilder {
    let baseUrl: URL
    let relativeUrl: String
    
    func build() throws -> URLRequest {
        guard let url = URL(string: relativeUrl, relativeTo: baseUrl) else { throw RequestBuilderError.invalidUrl }
        
        return URLRequest(url: url)
    }
}
