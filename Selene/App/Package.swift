// swift-tools-version:5.9
import PackageDescription

let package = Package(
    name: "App",
    platforms: [
       .macOS(.v13)
    ],
    dependencies: [
        // 💧 A server-side Swift web framework.
        .package(url: "https://github.com/vapor/vapor.git", from: "4.89.0"),
        .package(url: "https://github.com/vapor/fluent.git", from: "4.0.0"),
        .package(url: "https://github.com/vapor/fluent-postgres-driver.git", from: "2.8.0"),
        .package(url: "https://github.com/crypt0s1s/stitch_linux", .upToNextMajor(from: "1.0.2")),
        .package(path: "../SeleneApi"),
        .package(path: "../SeleneAuth"),
        .package(path: "../SeleneCore"),
    ],
    targets: [
        .executableTarget(
            name: "App",
            dependencies: [
                .product(name: "Vapor", package: "vapor"),
                .product(name: "Fluent", package: "fluent"),
                .product(name: "Stitch", package: "stitch_linux"),
                .product(name: "FluentPostgresDriver", package: "fluent-postgres-driver"),
                "SeleneApi",
                "SeleneAuth",
                "SeleneCore",
            ]
        ),
        .testTarget(name: "AppTests", dependencies: [
            .target(name: "App"),
            .product(name: "Fluent", package: "fluent"),
            .product(name: "Stitch", package: "stitch_linux"),
            .product(name: "XCTVapor", package: "vapor"),
            .product(name: "FluentPostgresDriver", package: "fluent-postgres-driver"),

            // Workaround for https://github.com/apple/swift-package-manager/issues/6940
            .product(name: "Vapor", package: "vapor"),
            "SeleneApi",
            "SeleneAuth",
            "SeleneCore",
        ]),
    ]
)
