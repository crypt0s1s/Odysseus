//
//  ApiValues.swift
//
//
//  Created by Joshua Sumskas on 7/1/2024.
//

import Foundation

public protocol ApiValues {
    var baseUrl: URL { get }
    var version: String { get }
}
