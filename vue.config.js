const path = require('path');
const webpack = require('webpack');

const resolve = dir => path.join(__dirname, dir);

// eslint-disable-next-line no-unused-vars
const BASE_URL = process.env.NODE_ENV === 'production' ? '/obor-cms' : './';
const baseUrl = '/';
module.exports = {
  lintOnSave: false,
  publicPath: './',
  transpileDependencies: [
    'quill-image-drop-module',
    'quill-image-extend-module',
  ],
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('_c', resolve('src/components'));
    config.plugin('provide').use(webpack.ProvidePlugin, [
      {
        'window.Quill': 'quill/dist/quill.js',
        Quill: 'quill/dist/quill.js',
      },
    ]);
  },
  // 打包时不生成.map文件(加快打包的速度)
  productionSourceMap: false,
  // 解决跨域问题
  devServer: {
    port: 8081, // 端口
    proxy: 'http://101.133.219.6:10010',
    before: function(app) {
      const base = baseUrl.replace(/\/+$/, ''); // 移除尾部斜杠
      app.get(`${base}/:page/*`, function(req, res, next) {
        if (['client', 'index'].includes(req.params.page)) {
          // 把 /<base>/<page>/* 重定向到 /<base>/<page>/
          req.url = `${base}/${req.params.page}/`;
          next('route');
        } else {
          next();
        }
      });
    },
  },
  pages: {
    client: {
      entry: 'src/client/clientMain.js',
      template: 'public/client.html',
    },
    cms: {
      entry: 'src/cms/cmsMain.js',
      template: 'public/cms.html',
    },
  },
};
