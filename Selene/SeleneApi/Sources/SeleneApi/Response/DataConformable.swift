//
//  DataConformable.swift
//
//
//  Created by Joshua Sumskas on 7/1/2024.
//

#if canImport(FoundationNetworking)
import FoundationNetworking
#endif
import Foundation

protocol DataConformable {
    var data: Data { get }
    var response: URLResponse { get }
}

public struct NetworkResponse: DataConformable {
    public let data: Data
    let response: URLResponse
    var statusCode: Int?
    
    public init(data: Data, response: URLResponse, statusCode: Int? = nil) {
        self.data = data
        self.response = response
        self.statusCode = statusCode
    }
}

extension NetworkResponse: Equatable {
    public static func == (lhs: NetworkResponse, rhs: NetworkResponse) -> Bool {
        return lhs.data == rhs.data && lhs.statusCode == rhs.statusCode
    }
}
