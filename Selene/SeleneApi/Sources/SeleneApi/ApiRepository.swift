//
//  ApiRepository.swift
//
//
//  Created by Joshua Sumskas on 6/1/2024.
//

#if canImport(FoundationNetworking)
    import FoundationNetworking
#endif
import Foundation

public protocol ApiRepository {
    func perform<Decode: Decodable>(_ method: HttpRequestMethod, builder: RequestBuilder) async throws -> Decode
}

extension ApiRepository {
    public func perform<Decode: Decodable>(_ method: HttpRequestMethod, builder: RequestBuilder) async throws -> Decode {
        do {
            let req = try RequestMethodBuilder(
                method: method,
                builder: builder
            ).build()
            
            return try await process(req)
        } catch {
            switch error {
            case is ApiError: throw error
            default: throw ApiError.other(error: error)
            }
        }
    }
    
    func process<Decode: Decodable>(_ urlRequest: URLRequest) async throws -> Decode {
        let processor = DecodeProcessor<Decode>(
            processor: ResponseProcessor(
                processor: DataTaskProcessor()
            )
        )
        return try await processor.process(urlRequest)
    }
}
