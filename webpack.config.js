/**
 * Created by jyothi on 21/4/17.
 */
module.exports = {

    entry: './src/index.js',
    output: {
        path: __dirname,
        filename: './dist/bundle.js',
        //publicPath: BUILD ? '/dist' : 'http://localhost:8080/dist',
        //chunkFilename: '[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.js$/,
                loaders: ['babel?presets[]=react,presets[]=es2015'],
                exclude: /(node_modules|bower_components)/
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
                loader: 'file'
            },
            {
                test: /\.html$/,
                loader: 'raw'
            }
        ]
    },
    /*devServer: {
        contentBase: '.',
        stats: {
            modules: false,
            cached: true,
            colors: true,
            chunk: false
        }
    }*/
}