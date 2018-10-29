const {VueLoaderPlugin} = require('vue-loader');

module.exports = [{
    entry: './src/app/index.js',
    output: {
        path: __dirname + '/src/public/js',
        filename: 'index.js'
    },
    module:{
        rules:[{
            test: /\.js$/,
            exclude: /node_modules/,
            use:{
                loader: 'babel-loader'
            }
        },{
            test: /\.vue$/,
            loader: 'vue-loader'
        }]
    },
    plugins:[
        new VueLoaderPlugin()
    ]
},{
    entry: './src/app/agr_tra.js',
    output: {
        path: __dirname + '/src/public/js',
        filename: 'agr_tra.js'
    },
    module:{
        rules:[{
            test: /\.js$/,
            exclude: /node_modules/,
            use:{
                loader: 'babel-loader'
            }
        },{
            test: /\.vue$/,
            loader: 'vue-loader'
        }]
    },
    plugins:[
        new VueLoaderPlugin()
    ]
}/*,{
    entry: './src/app/menu.js',
    output: {
        path: __dirname + '/src/public/js',
        filename: 'menu.js'
    },
    module:{
        rules:[{
            test: /\.js$/,
            exclude: /node_modules/,
            use:{
                loader: 'babel-loader'
            }
        },{
            test: /\.vue$/,
            loader: 'vue-loader'
        }]
    },
    plugins:[
        new VueLoaderPlugin()
    ]
},
{
    entry: './src/app/login.js',
    output: {
        path: __dirname + '/src/public/js',
        filename: 'login.js'
    },
    module:{
        rules:[{
            test: /\.js$/,
            exclude: /node_modules/,
            use:{
                loader: 'babel-loader'
            }
        },{
            test: /\.vue$/,
            loader: 'vue-loader'
        }]
    },
    plugins:[
        new VueLoaderPlugin()
    ]
}*/
];
