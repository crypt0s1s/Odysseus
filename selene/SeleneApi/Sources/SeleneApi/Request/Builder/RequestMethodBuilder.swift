//
//  RequestMethodBuilder.swift
//
//
//  Created by Joshua Sumskas on 6/1/2024.
//

import Foundation

struct RequestMethodBuilder: RequestBuilder {
    let method: HttpRequestMethod
    let builder: RequestBuilder
    
    init(method: HttpRequestMethod, builder: RequestBuilder) {
        self.method = method
        self.builder = builder
    }
    
    func build() throws -> URLRequest {
        var req = try builder.build()
        req.httpMethod = method.rawValue
        req.httpBody = method.body
        return req
    }
}
