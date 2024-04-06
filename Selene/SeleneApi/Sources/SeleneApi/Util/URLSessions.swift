//
//  URLSessions.swift
//
//
//  Created by Joshua Sumskas on 7/1/2024.
//

#if canImport(FoundationNetworking)
    import FoundationNetworking
#endif
import Foundation
import Stitch

enum URLSessions {
    public static var `default`: URLSession = {
        let config = URLSessionConfiguration.default
        config.timeoutIntervalForRequest = 20 // seconds
        config.timeoutIntervalForResource = 20 // seconds
        
        return URLSession(configuration: config)
    }()
}

// MARK: - Provide our json decoder as an injected property
extension DependencyMap {
    private struct UrlSessionKey: DependencyKey {
        static var dependency: URLSession = URLSessions.default
    }
    
    public var urlSession: URLSession {
        get { resolve(key: UrlSessionKey.self) }
        set { register(key: UrlSessionKey.self, dependency: newValue) }
    }
}
