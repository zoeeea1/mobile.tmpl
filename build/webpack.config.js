const path = require('path');
const utils = require('./utils')
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = (env) => {
    if (!env) env = {};

    const bundleOutputDir = './dist';

    return [{
        stats: { modules: false },
        context: path.join(__dirname, '..'),
        resolve: {
            extensions: ['.js', '.vue'],
            alias: {
                '@': path.join(__dirname, '../src'),
                'components': path.join(__dirname, '../src', 'components'),
                'api': path.join(__dirname, '../src', 'api'),
                'plus': path.join(__dirname, '../src', 'plus')
            }
        },
        entry: { 'index': './src/startup.js' },
        module: {
            rules: [
                { test: /\.vue(\?[^?]+)?$/, include: /src/, loader: 'vue-loader', options: { loaders: utils.cssLoaders({ sourceMap: !env.prod, extract: env.prod }) } },
                { test: /\.js$/, use: ['babel-loader'], include: /src/ },
                { test: /\.css$/, loader: 'style-loader!css-loader' },
                { test: /\.(png|jpg|jpeg|gif|svg)$/, use: 'url-loader?limit=5000&name=imgs/[name].[ext]?[hash:8]' },
                { test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/, use: 'url-loader?limit=1000&name=fonts/[name].[ext]?[hash:8]' },
            ]
        },
        output: {
            path: path.join(__dirname, '..', bundleOutputDir),
            filename: 'js/[name]_[hash].js',
            chunkFilename: 'js/[name].js',
            // publicPath: ''
        },
        devServer: {
            host: '0.0.0.0',
            // port: 8989,
            historyApiFallback: true,
            hot: true,
            disableHostCheck: true,
            inline: true,
            contentBase: './dist/',
            publicPath: '/'
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify(env.prod ? 'production' : env.test ? 'staging' : 'development')
                }
            }),
            // extract css into its own file
            new ExtractTextPlugin('css/style.css?[contenthash]', {
                allChunks: true
            }),
            // Compress extracted CSS. We are using this plugin so that possible
            // duplicated CSS from different components can be deduped.
            // new OptimizeCSSPlugin({
            //     cssProcessorOptions: {
            //         safe: true
            //     }
            // }),
            // split vendor js into its own file
            new webpack.optimize.CommonsChunkPlugin({
                name: 'vendor',
                minChunks: function (module, count) {
                    // any required modules inside node_modules are extracted to vendor  
                    return (
                        module.resource &&
                        /\.js$/.test(module.resource) &&
                        module.resource.indexOf('node_modules') >= 0
                    )
                }
            }),
            // extract webpack runtime and module manifest to its own file in order to
            // prevent vendor hash from being updated whenever app bundle is updated
            new webpack.optimize.CommonsChunkPlugin({
                name: 'manifest',
                chunks: ['vendor']
            }),
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: 'index.html',
                inject: true,
                minify: {
                    // removeComments: true,
                    // collapseWhitespace: true,
                    // removeAttributeQuotes: true
                    // more options:
                    // https://github.com/kangax/html-minifier#options-quick-reference
                },
                // necessary to consistently work with multiple chunks via CommonsChunkPlugin
                chunksSortMode: 'dependency',
                hash: true
            }),
        ].concat(!env.prod ? [

            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoEmitOnErrorsPlugin(),
            // Plugins that apply in development builds only
            new webpack.SourceMapDevToolPlugin({
                filename: '[file].map', // Remove this line if you prefer inline source maps
                moduleFilenameTemplate: path.relative(bundleOutputDir, '[resourcePath]') // Point sourcemap entries to the original file locations on disk
            })
        ] : [
                // Plugins that apply in production builds only

                new CleanWebpackPlugin([bundleOutputDir])
                // new webpack.optimize.UglifyJsPlugin()
            ])
    }];
};