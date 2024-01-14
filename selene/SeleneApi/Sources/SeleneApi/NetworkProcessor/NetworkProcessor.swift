//
//  NetworkProcessor.swift
//
//
//  Created by Joshua Sumskas on 6/1/2024.
//

import Foundation

public protocol NetworkProcessor<Response> {
    associatedtype Response
    func process(_ request: URLRequest) async throws -> Response
}

