//
//  DecodeProcessor.swift
//
//
//  Created by Joshua Sumskas on 7/1/2024.
//

import Foundation

public struct DecodeProcessor<Decode: Decodable>: NetworkProcessor {
    var processor: any NetworkProcessor<NetworkResponse>
    
    public init(processor: some NetworkProcessor<NetworkResponse>) {
        self.processor = processor
    }
    
    public func process(_ request: URLRequest) async throws -> Decode {
        let response = try await processor.process(request)
        
        // TODO: DI for json decoder
        let decoder = JSONDecoder()
        let data = try decoder.decode(Decode.self, from: response.data)
        return data
    }
}
