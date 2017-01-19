var path = require('path');
var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var Manifest = require('manifest-revision-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");

var rootPublic = path.resolve('./src');
var NODE_ENV = process.env.NODE_ENV || "production";
var DEVELOPMENT = NODE_ENV === "production" ? false : true;
var stylesLoader = 'css?root=' + rootPublic + '&sourceMap!postcss!sass?outputStyle=expanded&sourceMap=true&sourceMapContents=true';


module.exports = function(config) {
    config.set({

        browsers: ['PhantomJS2'],

        files: [
            { pattern: 'test-context.js'},        

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
                    },
                    {
                     test: /\.html$/,
                    loader: 'html',
                    
                        }
                        
                    , {
                        test: /\.css$/,
                        loaders: [
                        'style',
                        'css?sourceMap',
                        'postcss'
                        ]
                    }, {
                        test: /\.(scss|sass)$/,
                        loader: DEVELOPMENT ? ('style!' + stylesLoader) : ExtractTextPlugin.extract({
                        fallbackLoader: "style",
                        loader: stylesLoader
                        })
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
                    },
                    ],
                 },
                  watch: true
                        }
                    });
                };