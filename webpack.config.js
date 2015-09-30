module.exports = {
    entry: "./app/app.js",
    output: {
        path: __dirname + 'app/dist',
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" }
        ]
    }
};