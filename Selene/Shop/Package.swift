// swift-tools-version: 5.9
// The swift-tools-version declares the minimum version of Swift required to build this package.

import PackageDescription

let package = Package(
    name: "Shop",
    platforms: [
       .macOS(.v13)
    ],
    products: [
        // Products define the executables and libraries a package produces, making them visible to other packages.
        .library(
            name: "Shop",
            targets: ["Shop"]),
    ],
    dependencies: [
        // 💧 A server-side Swift web framework.
        .package(url: "https://github.com/vapor/vapor.git", from: "4.89.0"),
        .package(url: "https://github.com/crypt0s1s/stitch_linux", .upToNextMajor(from: "1.0.2")),
        .package(path: "../SeleneAuth")
    ],
    targets: [
        .target(
            name: "Shop",
            dependencies: [
                .product(name: "Vapor", package: "vapor"),
                .product(name: "Stitch", package: "stitch_linux"),
                "SeleneAuth",
            ]
        ),
        .testTarget(
            name: "ShopTests",
            dependencies: [
                .product(name: "XCTVapor", package: "vapor"),
                .product(name: "Stitch", package: "stitch_linux"),
                
                // Workaround for https://github.com/apple/swift-package-manager/issues/6940
                .product(name: "Vapor", package: "vapor"),
            ]),

    ]
    
)
