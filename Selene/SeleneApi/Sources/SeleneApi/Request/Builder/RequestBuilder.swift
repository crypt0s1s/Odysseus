//
//  RequestBuilder.swift
//
//
//  Created by Joshua Sumskas on 6/1/2024.
//

import Foundation

public protocol RequestBuilder {
    func build() throws -> URLRequest
}
