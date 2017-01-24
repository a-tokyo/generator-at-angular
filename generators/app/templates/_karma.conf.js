const path = require('path');
const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const Manifest = require('manifest-revision-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const rootPublic = path.resolve('./src');
const NODE_ENV = process.env.NODE_ENV || "production";
const DEVELOPMENT = NODE_ENV === "production"
    ? false
    : true;
const stylesLoader = 'css?root=' + rootPublic + '&sourceMap!postcss!sass?outputStyle=expanded&sourceMap=true&sourceMapContents=true';

module.exports = function(config) {
    config.set({

        browsers: ['PhantomJS2'],

        files: [
            {
                pattern: 'test-context.js'
            }
        ],

        frameworks: ['jasmine'],

        preprocessors: {
            'test-context.js': ['webpack']
        },

        webpack: {

            module: {
                loaders: [
                    {
                        test: /\.js/,
                        exclude: /node_modules/,
                        loader: 'babel-loader'
                    }, {
                        test: /\.html$/,
                        loader: 'html'
                    }, {
                        test: /\.css$/,
                        loaders: ['style', 'css?sourceMap', 'postcss']
                    }, {
                        test: /\.(scss|sass)$/,
                        loader: DEVELOPMENT
                            ? ('style!' + stylesLoader)
                            : ExtractTextPlugin.extract({fallbackLoader: "style", loader: stylesLoader})
                    }, {
                        test: /\.(ttf|otf|svg|eot|woff(2)?)(\?[a-z0-9=&.]+)?$/,
                        loaders: [
                            {
                                loader: 'url-loader',
                                query: {
                                    name: 'assets/fonts/[name]_[hash].[ext]'
                                }
                            }
                        ]
                    }
                ]
            },
            watch: true
        }
    });
};
