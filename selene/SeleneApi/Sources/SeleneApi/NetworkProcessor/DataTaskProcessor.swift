//
//  DataTaskProcessor.swift
//  
//
//  Created by Joshua Sumskas on 7/1/2024.
//

import Foundation
import Stitch

public struct DataTaskProcessor: NetworkProcessor {
    @Stitch(\.urlSession) var urlSession
    
    public init() {}
    
    public func process(_ request: URLRequest) async throws -> NetworkResponse {
        let (data, response) = try await urlSession.data(for: request)
        return NetworkResponse(data: data, response: response)
    }
}
