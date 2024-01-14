//
//  configure.swift
//  
//
//  Created by Joshua Sumskas on 7/1/2024.
//

import Vapor
// TODO: move this
import Fluent
import JWT

public func configure(_ app: Application) async throws {
    app.migrations.add(User.Migration())
    
    // MARK: - JWT
    // TODO: update the secret
    app.jwt.signers.use(.hs256(key: "secret"))

    try routes(app)
}

final class UserToken: Model, Content {
    static let schema = "user_tokens"

    @ID(key: .id)
    var id: UUID?

    @Field(key: "value")
    var value: String

    @Parent(key: "user_id")
    var user: User

    init() { }

    init(id: UUID? = nil, value: String, userID: User.IDValue) {
        self.id = id
        self.value = value
        self.$user.id = userID
    }
}
