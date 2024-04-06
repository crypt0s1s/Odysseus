//
//  RequestQueryBuilder.swift
//
//
//  Created by Joshua Sumskas on 7/1/2024.
//

#if canImport(FoundationNetworking)
    import FoundationNetworking
#endif
import Foundation

public struct RequestQueryBuilder: RequestBuilder {
    var queryItems: [URLQueryItem]
    var builder: RequestBuilder
    
    public init(queryItems: [URLQueryItem], builder: RequestBuilder) {
        self.queryItems = queryItems
        self.builder = builder
    }
    
    public func build() throws -> URLRequest {
        var request = try builder.build()
        
        // Retrieve our url and add our query params.
        // If no url was found in the request then skip over and
        // return the previous builders request as it may already be handled
        if let url = request.url {
            var components = URLComponents(url: url, resolvingAgainstBaseURL: false)
            components?.queryItems = queryItems
            request.url = components?.url
        }
        
        return request
    }
}
