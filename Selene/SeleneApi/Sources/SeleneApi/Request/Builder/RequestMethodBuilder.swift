//
//  RequestMethodBuilder.swift
//
//
//  Created by Joshua Sumskas on 6/1/2024.
//

#if canImport(FoundationNetworking)
    import FoundationNetworking
#endif
import Foundation

struct RequestMethodBuilder: RequestBuilder {
    let method: HttpRequestMethod
    let builder: RequestBuilder
    
    func build() throws -> URLRequest {
        var req = try builder.build()
        req.httpMethod = method.rawValue
        req.httpBody = method.body
        return req
    }
}
