//@ts-check
const { EsbuildPlugin } = require('esbuild-loader')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
require('dotenv').config()

/**
 * @type {(dev: boolean, name: string) => import('webpack').Configuration}
 */
const config = (dev, name) => ({
    mode: dev ? 'development' : 'production',
    entry: './src/main.tsx',
    output: {
        filename: `static/${name}.js`,
        path: path.resolve(__dirname, 'public'),
        clean: true,
    },
    target: ['web', 'es2020'],
    optimization: {
        minimize: !dev,
        minimizer: [
            new EsbuildPlugin({
                target: 'es2020',
                css: true,
            }),
        ],
        runtimeChunk: 'single',
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            },
            {
                test: /\.tsx$/i,
                loader: 'esbuild-loader',
                options: {
                    loader: 'tsx',
                    target: 'es2020',
                },
            },
            {
                test: /\.ts$/i,
                loader: 'esbuild-loader',
                options: {
                    loader: 'ts',
                    target: 'es2020',
                },
            },
            {
                test: /\.(png|jpe?g|webp)/,
                loader: 'file-loader',
                options: {
                    name: `static/${name}.[ext]`,
                },
            },
            {
                test: /\.svg$/,
                type: 'asset/inline',
            },
            {
                test: /\.md$/,
                type: 'asset/source',
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            publicPath: '/',
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true,
                minifyCSS: true,
                minifyJS: true,
            },
        }),
        new MiniCssExtractPlugin({
            filename: `static/${name}.css`,
        }),
    ],
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    //@ts-ignore
    devServer: {
        host: '0.0.0.0',
        port: process.env.WEBPACK_DEV_SERVER_PORT || 8081,
        static: './public',
        hot: true,
        historyApiFallback: true,
        //@ts-ignore
        proxy: {
            '*': 'http://localhost:' + process.env.PORT || 8080,
        },
    },
    devtool: dev ? 'source-map' : false,
    performance: {
        maxAssetSize: 512000,
    },
})

module.exports = function (env, argv) {
    console.log(argv)
    const dev = argv.mode == 'development'
    const name = dev ? '[name]' : '[contenthash]'

    return config(dev, name)
}
