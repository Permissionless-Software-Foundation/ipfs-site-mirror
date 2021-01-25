/*
  This config file contains settings shared across files.
  Toolset and REST API can be selected with this file, or by setting the RESTAPI
  environment variable. By default, Bitcoin.com's infrastructure is used.
  You can run your own infrastructure. See bchjs.cash for details.
*/

'use strict'

// By default choose a local rest API.
let RESTAPI = 'fullstack.cash'

// Override the RESTAPI setting if envronment variable is set.
if (process.env.RESTAPI && process.env.RESTAPI !== '') {
  RESTAPI = process.env.RESTAPI
}

// Ensure bch-js can pick up the env var.
process.env.RESTAPI = RESTAPI

const BCHJS = require('@psf/bch-js')

const config = {}

// Use bch-js but use it with the bitcoin.com infrastructure.
if (RESTAPI === 'fullstack.cash') {
  config.BCHLIB = BCHJS
  config.MAINNET_REST = `https://api.fullstack.cash/v4/`
  config.TESTNET_REST = `https://tapi.fullstack.cash/v4/`
  config.RESTAPI = 'bchjs'
}

module.exports = config
