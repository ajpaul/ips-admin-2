module.exports = {
    resolve: {
        extensions: ['', '.js', '.ts'],
        // alias: {
        //     handlebars: 'handlebars/dist/handlebars.min.js'
        // }
    },

    devtool: 'inline-source-map',

    module: {
        loaders: [
            { test: /\.ts$/, exclude: /node_modules/, loader: 'awesome-typescript-loader'},
            { test: /\.html$/, exclude: /node_modules/, loader: 'raw-loader' },

            // Extract css files
            {
                test: /\.css$/,
                loader: 'null'
            },
            // Optionally extract less files
            // or any other compile-to-css language
            {
                test: /\.less$/,
                loader: 'null'
            }
        ]
    },
    node: {
        console: true,
        global: true,
        Buffer: true,
        process: true,
        crypto: 'empty',
        module: false,
        clearImmediate: false,
        setImmediate: false
    }
};
