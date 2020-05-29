/* eslint-disable no-console */
const express = require('express')
const getProxy = require('./proxy');
const { parse } = require('url');
const next = require('next')

const devProxy = getProxy();

const port = parseInt(process.env.PORT, 10) || 3000
const env = process.env.NODE_ENV
const dev = env !== 'production'
const app = next({
  dir: '.', // base directory where everything is, could move to src later
  dev,
})

const handle = app.getRequestHandler()

let config
app
  .prepare()
  .then(() => {
    config = express()

    // Set up the proxy.
    if (dev && devProxy) {
      const { createProxyMiddleware } = require('http-proxy-middleware')
      Object.keys(devProxy).forEach(function(context) {
        config.use(createProxyMiddleware(context, devProxy[context]))
      })
    }

    // Default catch-all handler to allow Next.js to handle all other routes
    config.all('*', (req, res) => {
      const parsedUrl = parse(req.url, true)
      const { pathname, query } = parsedUrl

      if (pathname.length > 1 && pathname.slice(-1) === '/') {
        app.render(req, res, pathname.slice(0, -1), query)
      }
      else {
        handle(req, res, parsedUrl)
      }
    })

    config.listen(port, err => {
      if (err) {
        throw err
      }
      console.log(`> Ready on port ${port} [${env}]`)
    })
  })
  .catch(err => {
    console.log('An error occurred, unable to start the server')
    console.log(err)
  })
