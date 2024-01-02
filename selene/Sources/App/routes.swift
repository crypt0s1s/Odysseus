import Vapor

func routes(_ app: Application) throws {
    try app.register(collection: CatalogueController())
    app.get { req async in
        "It works!"
    }

    app.get("hello") { req async -> String in
        "Hello, world!"
    }

    app.get("hello2") { req async -> String in 
        "Hello, world! 2"
    }

    app.get("hello3") { req async -> String in
        "3"
    }
}
