import Vapor

extension Application {
    func routes() throws {
        try self.register(collection: CatalogueController())
        try self.register(collection: PokemonController())
        try self.register(collection: TranslationsController())

        self.get { _ async in
            "It works!"
        }

        self.get("hello") { _ async -> String in
            "Hello, world!"
        }

        self.get("hello2") { _ async -> String in
            "Hello, world! 2"
        }

        self.get("hello3") { _ async -> String in
            "3"
        }
    }
}
