//
//  Catalogue+equatable.swift
//
//
//  Created by Joshua Sumskas on 23/2/2024.
//

@testable import App

extension Catalogue: Equatable {
    public static func == (lhs: App.Catalogue, rhs: App.Catalogue) -> Bool {
        lhs.name == rhs.name &&
        lhs.price == rhs.price &&
        lhs.imageUrl == rhs.imageUrl
    }
}
