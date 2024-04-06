//
//  DataTaskProcessor.swift
//  
//
//  Created by Joshua Sumskas on 7/1/2024.
//

#if canImport(FoundationNetworking)
    import FoundationNetworking
#endif
import Foundation
import Stitch

public struct DataTaskProcessor: NetworkProcessor {
    @Stitch(\.urlSession) var urlSession
    
    public init() {}
    
    public func process(_ request: URLRequest) async throws -> NetworkResponse {
        #if canImport(FoundationNetworking)
        
            throw ApiError.message(msg: "JOSH FIX UP DataTaskProcessor for linux", statusCode: 400)
        
            let response: URLResponse? = nil
            let data = Data(count: 1)
        
            guard let response else { throw ApiError.badRequest }
//            let response = URLResponse()
//            let data: Data
//            let response: URLResponse
//        
//            await withCheckedContinuation { continuation in
//                let dataTask = urlSession.dataTask(with: request) { returnedData, returendResponse, error in
//                    guard let returnedData, let returendResponse else {
//                        throw ApiError.other(error: error)
//                    }
//                    
//                    self.data = returnedData
//                    self.response = returnedResponse
//                    
//                    
//                    continuation.resume()
//                }
//                dataTask.resume()
//            }
//            let dataTask = try await urlSession.dataTask(with: request)
//            let response = dataTask.response
//        let data = response.
        
//        dataTask.
        #else
            let (data, response) = try await urlSession.data(for: request)
        #endif
        return NetworkResponse(data: data, response: response)
    }
}
