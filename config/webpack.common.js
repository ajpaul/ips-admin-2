const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const helpers = require('./helpers');

module.exports = {

    entry: {
        'polyfills': './src/polyfills.ts',
        'vendor': './src/vendor.ts',
        'app': './src/main.ts'
    },

    resolve: {
        extensions: ['', '.js', '.ts', '.less'],

        // Make sure root is src
        root: helpers.root('src'),

        modulesDirectories: ['node_modules']
    },

    module: {
        loaders: [
            { 
                test: /\.ts$/, 
                loaders: ['awesome-typescript-loader','angular2-template-loader'],
                exclude: [/\.(spec|e2e)\.ts$/, /node_modules/]
            },
            { 
                test: /\.html$/,
                loader: 'raw-loader',
                exclude: [helpers.root('src/index.html')]
            },

            // File loader for supporting images, for example, in CSS files.
            /*{ 
                test: /\.(png|gif|jpg)$/, 
                loader: "file?name=images/[name].[ext]" 
            },*/

            // Standard [inline] CSS loader
            { 
                test: /\.css$/, 
                loaders: ['style-loader', 'css-loader'],
                exclude: [/node_modules/]
            },

            //Finds less files not named with c*omponent or *container (assumed global styles)
            {
                test: /^((?!component|container).)*.less$/,
                loaders: ['style-loader', 'css-loader', 'less-loader'],
                exclude: [/node_modules/]
            },

            //Finds component or container less files (assumed angular component)
            {
                test: /(component|container)\.less$/,
                loaders: ['to-string-loader', 'css-loader', 'less-loader'],
                exclude: [/node_modules/]
            }

        ]
    },

    plugins: [
        /*
        * Plugin: OccurenceOrderPlugin
        * Description: Varies the distribution of the ids to get the smallest id length
        * for often used ids.
        *
        * See: https://webpack.github.io/docs/list-of-plugins.html#occurrenceorderplugin
        * See: https://github.com/webpack/docs/wiki/optimization#minimize
        */
        new webpack.optimize.OccurenceOrderPlugin(true),

        /*
        * Plugin: CommonsChunkPlugin
        * Description: Shares common code between the pages.
        * It identifies common modules and put them into a commons chunk.
        *
        * See: https://webpack.github.io/docs/list-of-plugins.html#commonschunkplugin
        * See: https://github.com/webpack/docs/wiki/optimization#multi-page-app
        */
        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'vendor','polyfills']
        }),

        /*
        * Plugin: HtmlWebpackPlugin
        * Description: Simplifies creation of HTML files to serve your webpack bundles.
        * This is especially useful for webpack bundles that include a hash in the filename
        * which changes every compilation.
        *
        * See: https://github.com/ampedandwired/html-webpack-plugin
        */
        new HtmlWebpackPlugin({
            template: './src/index.html',
            chunksSortMode: 'dependency'
        })
    ],

    /*
    * Include polyfills or mocks for various node stuff
    * Description: Node configuration
    *
    * See: https://webpack.github.io/docs/configuration.html#node
    */
    node: {
        global: 'window',
        crypto: 'empty',
        process: true,
        module: false,
        clearImmediate: false,
        setImmediate: false
    }
};