const path = require('path');

const resolve = dir => path.join(__dirname, dir);

// eslint-disable-next-line no-unused-vars
const BASE_URL = process.env.NODE_ENV === 'production' ? '/obor-cms' : './';

module.exports = {
  lintOnSave: false,
  publicPath: './',
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('_c', resolve('src/components'));
  },
  // 打包时不生成.map文件(加快打包的速度)
  productionSourceMap: false,
  // 解决跨域问题
  devServer: {
    port: 8081, // 端口
    proxy: 'http://101.133.219.6:10010',
  },
};
