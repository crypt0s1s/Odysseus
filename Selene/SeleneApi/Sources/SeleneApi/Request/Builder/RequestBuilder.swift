//
//  RequestBuilder.swift
//
//
//  Created by Joshua Sumskas on 6/1/2024.
//

#if canImport(FoundationNetworking)
import FoundationNetworking
#endif
import Foundation

public protocol RequestBuilder {
    func build() throws -> URLRequest
}
