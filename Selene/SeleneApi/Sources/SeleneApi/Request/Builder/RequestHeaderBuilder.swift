//
//  RequestHeaderBuilder.swift
//
//
//  Created by Joshua Sumskas on 6/1/2024.
//

import Foundation

struct RequestHeaderBuilder: RequestBuilder {
    let builder: RequestBuilder
    let headers: [String: String]
    
    init(_ builder: RequestBuilder, headers: [String: String]) {
        self.builder = builder
        self.headers = Headers.default.merging(headers) { (_, new) in new }
    }
    
    func build() throws -> URLRequest {
        var req = try builder.build()
        _ = headers.map {
            req.setValue($0.value, forHTTPHeaderField: $0.key)
        }
        return req
    }
}
