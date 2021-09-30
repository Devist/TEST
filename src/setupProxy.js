const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/dashboard/user', {
      target: 'http://localhost:9203',
      changeOrigin: true
    })
  )

  app.use(
    createProxyMiddleware('/dashboard/trigger', {
      target: 'http://localhost:9203',
      changeOrigin: true
    })
  )

  app.use(
    createProxyMiddleware('/dashboard/mgmt', {
      target: 'http://localhost:9203',
      changeOrigin: true
    })
  )

  app.use(
    createProxyMiddleware('/dashboard/data', {
      target: 'http://localhost:9203',
      changeOrigin: true
    })
  )

  app.use(
    createProxyMiddleware('/dashboard/bigquery', {
      target: 'http://localhost:9203',
      changeOrigin: true
    })
  )

  app.use(
    createProxyMiddleware('/dashboard/guide', {
      target: 'http://localhost:9203',
      changeOrigin: true
    })
  )

  app.use(
    createProxyMiddleware('/dashboard/logout', {
      target: 'http://localhost:9203',
      changeOrigin: true
    })
  )
}
