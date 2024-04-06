//
//  NetworkProcessor.swift
//
//
//  Created by Joshua Sumskas on 6/1/2024.
//

#if canImport(FoundationNetworking)
import FoundationNetworking
#endif
import Foundation

public protocol NetworkProcessor<Response> {
    associatedtype Response
    func process(_ request: URLRequest) async throws -> Response
}
