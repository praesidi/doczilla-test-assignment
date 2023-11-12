import { createProxyMiddleware } from 'http-proxy-middleware';

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://todo.doczilla.pro',
      changeOrigin: true,
      // headers: {
      //   'Access-Control-Allow-Origin': '*',
      //   'Access-Control-Allow-Headers':
      //     'Origin, X-Requested-With, Content-Type, Accept',
      //   'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      // },
    })
  );
};
