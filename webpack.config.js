var $path = require("path");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    optimization: {
        minimizer: [
            new TerserPlugin({ cache: true, parallel: true, sourceMap: false }),
            new OptimizeCSSAssetsPlugin({})
        ]
    },
    //options for webpack-dev-server
    devServer: {
        publicPath: '/dist/',
    },

    mode: "production",

    //enable sourcemaps for webpack output
    devtool: "source-map",

    entry: {
        index: "./src/index.js"
    },

    output: {
        path: $path.join(__dirname, "dist"),
        filename: "[name].js",
        chunkFilename: "[name].js",
    },

    module: {
        rules: [
            {
                test: /\.(j|t)sx?$/,
                exclude: /node_modules/,
                use: [
                    {   // see .babelrc for options
                        loader: "babel-loader",
                    },
                    {
                        loader: "ts-loader"
                    },
                ]

            },
            {
                test: /.js$/,
                use: ["source-map-loader"],
                enforce: "pre"
            },
            // taken from https://webpack.js.org/loaders/css-loader/
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
        ]
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx"]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),
        new CopyWebpackPlugin([{ from: "./src/static/", to: "static/" }])
    ]

};