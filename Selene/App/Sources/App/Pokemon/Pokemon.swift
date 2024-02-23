//
//  Pokemon.swift
//  
//
//  Created by Joshua Sumskas on 7/1/2024.
//

import Vapor

struct Pokemon: Content {
    var id: Int
    var name: String
    var height: Int
    var weight: Int
}
