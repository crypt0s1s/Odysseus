//
//  Environment+processKey.swift
//
//
//  Created by Joshua Sumskas on 24/2/2024.
//

import Vapor

extension Environment {
    ///  Returns environment key value if found
    ///
    /// Attempts to retrieve key value from `Environment`.
    /// If that is not present attempts to find value in the `ProcessInfo`.
    public static func processKey(_ key: String) -> String? {
        Environment.get(key) ?? ProcessInfo.processInfo.environment[key]
    }
}
