import Fluent
import Vapor

public protocol FluentRepository {
    init(_ req: Request)
}

public struct FluentRepositoryId: Hashable, Codable {

    public let string: String
    
    public init(_ string: String) {
        self.string = string
    }
}

public final class FluentRepositoryRegistry {

    private let app: Application
    private var builders: [FluentRepositoryId: ((Request) -> FluentRepository)]

    fileprivate init(_ app: Application) {
        self.app = app
        self.builders = [:]
    }

    fileprivate func builder(_ req: Request) -> FluentRepositoryFactory {
        .init(req, self)
    }
    
    fileprivate func make(_ id: FluentRepositoryId, _ req: Request) -> FluentRepository {
        guard let builder = builders[id] else {
            fatalError("FluentRepository for id `\(id.string)` is not configured.")
        }
        return builder(req)
    }
    
    public func register(_ id: FluentRepositoryId, _ builder: @escaping (Request) -> FluentRepository) {
        builders[id] = builder
    }
}

public struct FluentRepositoryFactory {
    private var registry: FluentRepositoryRegistry
    private var req: Request
    
    fileprivate init(_ req: Request, _ registry: FluentRepositoryRegistry) {
        self.req = req
        self.registry = registry
    }

    public func make(_ id: FluentRepositoryId) -> FluentRepository {
        registry.make(id, req)
    }
}

public extension Application {

    private struct Key: StorageKey {
        typealias Value = FluentRepositoryRegistry
    }
    
    var repositories: FluentRepositoryRegistry {
        if storage[Key.self] == nil {
            storage[Key.self] = .init(self)
        }
        return storage[Key.self]!
    }
}

public extension Request {
    
    var repositories: FluentRepositoryFactory {
        application.repositories.builder(self)
    }
}
