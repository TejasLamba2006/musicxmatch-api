module.exports = {
    transform: {
        "^.+\\.[tj]sx?$": "babel-jest",
    },
    testEnvironment: "node",
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    transformIgnorePatterns: [
        "/node_modules/(?!node-fetch|fetch-blob|formdata-polyfill|data-uri-to-buffer|abort-controller)/",
    ],
};