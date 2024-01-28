import Fluent
import Vapor

final class Catalogue: Model, Content {
    // Name of the table or collection.
    static let schema = "catalogue"

    @ID(key: .id)
    var id: UUID?

    @Field(key: "name")
    var name: String

    @Field(key: "price")
    var price: Double

    // When this Catalogue was created.
    @Timestamp(key: "created_at", on: .create)
    var createdAt: Date?

    // When this Catalogue was last updated.
    @Timestamp(key: "updated_at", on: .update)
    var updatedAt: Date?

    // Creates a new, empty Planet.
    init() { }

    // Creates a new Planet with all properties set.
    init(id: UUID? = nil, name: String, price: Double) {
        self.id = id
        self.name = name
        self.price = price
    }
}
