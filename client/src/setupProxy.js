const {createProxyMiddleware}  = require('http-proxy-middleware')

module.exports = function(app) {
  app.use('/api/*', createProxyMiddleware({
    target: 'http://localhost:5000',
    onError: (err, req, res) => {
      res.status(500).json({
        error: true,
        name: 'APIError',
        message: 'API down'
      });
    }
  }))
}