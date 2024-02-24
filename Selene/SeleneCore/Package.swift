// swift-tools-version: 5.9
// The swift-tools-version declares the minimum version of Swift required to build this package.

import PackageDescription

let package = Package(
    name: "SeleneCore",
    platforms: [
       .macOS(.v13)
    ],
    products: [
        // Products define the executables and libraries a package produces, making them visible to other packages.
        .library(
            name: "SeleneCore",
            targets: ["SeleneCore"]),
    ],
    dependencies: [
        // 💧 A server-side Swift web framework.
        .package(url: "https://github.com/vapor/vapor.git", from: "4.89.0"),
        .package(url: "https://github.com/vapor/fluent.git", from: "4.0.0"),
        .package(url: "https://github.com/vapor/fluent-postgres-driver.git", from: "2.8.0"),
        .package(url: "https://github.com/crypt0s1s/stitch_linux", .upToNextMajor(from: "1.0.2")),
    ],
    targets: [
        // Targets are the basic building blocks of a package, defining a module or a test suite.
        // Targets can depend on other targets in this package and products from dependencies.
        .target(
            name: "SeleneCore",
            dependencies: [
                .product(name: "Vapor", package: "vapor"),
                .product(name: "Fluent", package: "fluent"),
                .product(name: "FluentPostgresDriver", package: "fluent-postgres-driver"),
                .product(name: "Stitch", package: "stitch_linux"),
            ]
        ),
        .testTarget(
            name: "SeleneCoreTests",
            dependencies: [
                "SeleneCore",
                .product(name: "XCTVapor", package: "vapor"),
                .product(name: "Fluent", package: "fluent"),
                .product(name: "FluentPostgresDriver", package: "fluent-postgres-driver"),
                .product(name: "Stitch", package: "stitch_linux"),
                
                // Workaround for https://github.com/apple/swift-package-manager/issues/6940
                .product(name: "Vapor", package: "vapor"),
            ]),
    ]
)
