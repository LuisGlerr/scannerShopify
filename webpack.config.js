const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtracPlugin = require('mini-css-extract-plugin');

const devMode = process.env.NODE_ENV !== 'production'

module.exports = {
    //Configuración Javascript 
    entry: './frontend/app.js',
    output: {
        path: path.join(__dirname, 'backend/public'),
        filename: 'js/bundle.js'
    },
    // Configurar ambiente de trabajo, 
    mode: 'development',

    // Configuración CSS
    module: {
        rules: [
            {
                test: /\.css/,
                use: [
                    // Aqui hago una condicional para usar "style-loader ó MiniCssExtractPlugin"
                    devMode ? 'style-loader' : MiniCssExtracPlugin.loader,
                    'css-loader'
                ]
            }
        ]
    },
    // Configuración HTML
    plugins: [
        new HtmlWebpackPlugin({
            template: './frontend/index.html',
            minify: {
                // Opciones minificacion HTML
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true
            }
        }),
        // Definicion ruta archivos CSS
        new MiniCssExtracPlugin({
            filename: 'css/bundle.css'
        })
    ],
    //Herramienta para visualizar errores
    devtool: 'source-map'
}