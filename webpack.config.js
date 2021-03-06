const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build'),
};

const commonConfig={
 entry: {
    app: PATHS.app + '/index.js',
  },
  output: {
    path: PATHS.build,
    filename: '[name].js',
  },
  watch: true,
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Webpack demo',
    }),
  ],
}

function developmentConfig(){
  const config ={
    devServer:{
      historyApiFallback:true, //404s fallback to ./index.html
      // hotOnly:true, 使用hotOnly和hot都可以
      hot: true,
      stats:'errors-only', //只在发生错误时输出
      // host:process.env.Host, undefined
      // port:process.env.PORT, undefined
      overlay:{ //当有编译错误或者警告的时候显示一个全屏overlay
        errors:true,
        warnings:true,
      }
    },
     plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
      // new webpack.HashedModuleIdsPlugin(),
    ],
  };
  return Object.assign(
    {},
    commonConfig,
    config,
    {
      plugins: commonConfig.plugins.concat(config.plugins),
    }
  );
}

module.exports = function(env){
  console.log("env",env);
  if(env=='development'){
    return developmentConfig();
  }
  return commonConfig;
};
