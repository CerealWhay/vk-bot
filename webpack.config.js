// path — встроенный в Node.js модуль
const path = require('path')

module.exports = {
    target: 'node',
    mode: 'development',
    entry: './src/index.ts',
    externalsPresets: { node: true },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    output: {
        publicPath: '',
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        globalObject: 'this',
    }
}