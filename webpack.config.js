const path = require('path'),
      webpack = require('webpack'),
      ExtractTextPlugin = require("extract-text-webpack-plugin"),
      ExtractCSS = new ExtractTextPlugin('../css/[name].css?[hash]-[chunkhash]-[contenthash]-[name]')

module.exports = {
    devtool:'source-map',
    context: __dirname + "/app",
    entry: {
        main:[
            "normalize-css/normalize.css",
            "main.styl"
        ],
        app:[
            'app',
            'tabsList/tabsList'
        ],
        tabs:[
            'tabs/tabs',
            'tab/tab',
        ],
    },
    output: {
        publicPath:'/assets/js/',
        path: path.join(__dirname, 'assets/js'),
        filename: "[name].js",
    },
    module: {
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
            { test: /\.styl$/,exclude: /resources\/styles/, loaders: ["style", "css?sourceMap", "stylus-loader?sourceMap"]},
            { test: /\.styl$/,exclude: /resources\/com/, loader: ExtractCSS.extract("style-loader", "css-loader!stylus-loader")},
            { test: /\.css$/,exclude: /resources\/com/,loader: ExtractCSS.extract("style-loader", "css-loader")},
            { test: /\.jade$/, loader: 'jade-loader' },
        ],
        preLoaders:[
            {test: /\.js$/,loader: "source-map-loader"}
        ]
    },
    resolve:{
        root: __dirname,
        modulesDirectories:["node_modules","bower_components","resources/views","resources/com","resources/styles","template","style"]
    },
    plugins: [
        ExtractCSS
    ]
}
