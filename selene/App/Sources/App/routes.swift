import Vapor

func routes(_ app: Application) throws {
    try app.register(collection: CatalogueController())
    try app.register(collection: PokemonController())
    try app.register(collection: TranslationsController())

    app.get { _ async in
        "It works!"
    }

    app.get("hello") { _ async -> String in
        "Hello, world!"
    }

    app.get("hello2") { _ async -> String in
        "Hello, world! 2"
    }

    app.get("hello3") { _ async -> String in
        "3"
    }
}
