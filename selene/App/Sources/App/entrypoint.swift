import Vapor
import Logging

@main
enum Entrypoint {
    static func main() async throws {
        var env = try Environment.detect()
        try LoggingSystem.bootstrap(from: &env)
        
        let app = Application(env)
        defer { app.shutdown() }
        
        do {
            try await app.configure()
        } catch {
            app.logger.report(error: error)
            throw error
        }
        try await app.execute()
    }
}
