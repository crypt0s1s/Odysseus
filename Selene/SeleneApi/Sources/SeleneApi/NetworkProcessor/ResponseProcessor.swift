//
//  ResponseProcessor.swift
//
//
//  Created by Joshua Sumskas on 7/1/2024.
//

#if canImport(FoundationNetworking)
import FoundationNetworking
#endif
import Foundation

public struct ResponseProcessor: NetworkProcessor {
    var customCodes: [Int]
    var processor: any NetworkProcessor<NetworkResponse>
    
    public init(customCodes: [Int] = [], processor: some NetworkProcessor<NetworkResponse>) {
        self.customCodes = customCodes
        self.processor = processor
    }
    
    public func process(_ request: URLRequest) async throws -> NetworkResponse {
        let response = try await processor.process(request)
        return try ApiResponseParser.parse(response, customCodes: customCodes)
    }
}
