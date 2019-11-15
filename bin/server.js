/*
  This webserver is intended to be used with this memo-push publishing tool:
  https://github.com/christroutner/memo-push
*/

const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const convert = require('koa-convert')
const logger = require('koa-logger')
const mount = require('koa-mount')
const serve = require('koa-static')
const cors = require('kcors')

// App specific libraries.
const config = require('../config')
const errorMiddleware = require('../src/middleware')
const hash = require('../config/state.json').lastHash

// Used for debugging and iterrogating JS objects.
const util = require('util')
util.inspect.defaultOptions = { depth: 1 }

async function startServer () {
  // Create a Koa instance.
  const app = new Koa()

  // MIDDLEWARE START

  app.use(convert(logger()))
  app.use(bodyParser())
  app.use(errorMiddleware())

  // Custom Middleware Modules
  const modules = require('../src/modules')
  modules(app)

  // Enable CORS for testing
  // THIS IS A SECURITY RISK. COMMENT OUT FOR PRODUCTION
  app.use(cors({ origin: '*' }))

  // MIDDLEWARE END

  // Mount the downloaded directory and serve it.
  console.log(`Mount and serve content with hash :${hash}`)
  app.use(convert(mount('/', serve(`${process.cwd()}/ipfs-data/${hash}`))))
  await app.listen(config.port)
  console.log(`Server started on ${config.port}`)
  console.log(`Access website at http://localhost:${config.port}/`)
}
// startServer()

module.exports = {
  startServer
}
