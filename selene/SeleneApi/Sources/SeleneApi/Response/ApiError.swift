//
//  ApiError.swift
//
//
//  Created by Joshua Sumskas on 7/1/2024.
//

import Foundation

enum ApiError: Error {
    case badRequest
    case unauthorized
    case forbidden
    case conflict
    case denied
    case notFound
    case imATeapot
    case timeout
    case connection
    case other(error: Error)
    case message(msg: String, statusCode: Int)
    case server(statusCode: Int, payload: Data?)
    case errorMessage(message: ApiMessageError, statusCode: Int)
}

public struct ApiMessageError: Codable {
    public var code: Int?
    public var reason: String?
    public var message: String?
    public var displayMessage: String?
    public var underlyingErrors: String?
    public var canRetry: Bool
    
    public init(
        code: Int? = nil,
        reason: String? = nil,
        message: String? = nil,
        displayMessage: String? = nil,
        underlyingErrors: String? = nil,
        canRetry: Bool
    ) {
        self.code = code
        self.reason = reason
        self.message = message
        self.displayMessage = displayMessage
        self.underlyingErrors = underlyingErrors
        self.canRetry = canRetry
    }
}
