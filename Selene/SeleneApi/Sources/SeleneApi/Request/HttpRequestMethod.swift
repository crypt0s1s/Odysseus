//
//  HttpRequestMethod.swift
//
//
//  Created by Joshua Sumskas on 6/1/2024.
//

import Foundation

public enum HttpRequestMethod {
    case get
    case post(body: Data?)
    
    public var rawValue: String {
        switch self {
        case .get: "GET"
        case .post: "POST"
        }
    }
    
    public var body: Data? {
        switch self {
        case .get: nil
        case let .post(body): body
        }
    }
}
