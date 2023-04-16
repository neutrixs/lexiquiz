import { Configuration } from 'webpack'
import { config as dotenvConf } from 'dotenv'
import { EsbuildPlugin } from 'esbuild-loader'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import path from 'path'

dotenvConf()
const config = (dev: boolean, name: string): Configuration => ({
    mode: dev ? 'development' : 'production',
    entry: './src/main.tsx',
    output: {
        filename: `static/${name}.js`,
        path: path.resolve(__dirname, 'public'),
        clean: true,
    },
    target: ['web', 'es6'],
    optimization: {
        minimize: !dev,
        minimizer: [
            new EsbuildPlugin({
                target: 'es6',
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
                    target: 'es6',
                },
            },
            {
                test: /\.ts$/i,
                loader: 'esbuild-loader',
                options: {
                    loader: 'ts',
                    target: 'es6',
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
        proxy: {
            '*': 'http://localhost:' + process.env.PORT || 8080,
        },
        devMiddleware: {
            writeToDisk: true,
        },
    },
    devtool: dev ? 'source-map' : false,
    performance: {
        maxAssetSize: 512000,
    },
})

export default function (env: any, argv: any): Configuration {
    console.log(argv)
    const dev = argv.mode == 'development'
    const name = dev ? '[name]' : '[contenthash]'

    return config(dev, name)
}
