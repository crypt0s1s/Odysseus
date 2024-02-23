// swift-tools-version: 5.9
// The swift-tools-version declares the minimum version of Swift required to build this package.

import PackageDescription

let package = Package(
    name: "SeleneAuth",
    platforms: [
       .macOS(.v13)
    ],
    products: [
        // Products define the executables and libraries a package produces, making them visible to other packages.
        .library(
            name: "SeleneAuth",
            targets: ["SeleneAuth"]),
    ],
    dependencies: [
        // 💧 A server-side Swift web framework.
        .package(url: "https://github.com/vapor/vapor.git", from: "4.89.0"),
        .package(url: "https://github.com/vapor/fluent.git", from: "4.0.0"),
        .package(url: "https://github.com/vapor/jwt.git", from: "4.0.0"),
        .package(url: "https://github.com/entrhq/stitch.git", .upToNextMajor(from: "1.0.0")),
        .package(path: "../SeleneCore"),
    ],
    targets: [
        // Targets are the basic building blocks of a package, defining a module or a test suite.
        // Targets can depend on other targets in this package and products from dependencies.
        .target(
            name: "SeleneAuth",
            dependencies: [
                "SeleneCore",
                .product(name: "Vapor", package: "vapor"),
                .product(name: "Stitch", package: "stitch"),
                .product(name: "Fluent", package: "fluent"),
                .product(name: "JWT", package: "jwt"),
            ]
        ),
        .testTarget(
            name: "SeleneAuthTests",
            dependencies: [
                "SeleneAuth",
                "SeleneCore",
                .product(name: "XCTVapor", package: "vapor"),
                .product(name: "Stitch", package: "stitch"),
                
                // Workaround for https://github.com/apple/swift-package-manager/issues/6940
                .product(name: "Vapor", package: "vapor"),
                .product(name: "Fluent", package: "fluent"),
                .product(name: "JWT", package: "jwt"),
            ]),
    ]
)
