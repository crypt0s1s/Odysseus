//
//  Headers.swift
//
//
//  Created by Joshua Sumskas on 6/1/2024.
//

import Foundation

public struct Headers {
    public static let accepts = ["Accept": "application/json"]
    public static let contentType = ["Content-Type": "application/json"]
    public static let charset = ["charset": "utf-8"]
    
    // Create our default by merging our values
    public static let `default`: [String: String] = [:]
        .merging(accepts) { (_, new) in new }
        .merging(contentType) { (_, new) in new }
        .merging(charset) { (_, new) in new }
}
