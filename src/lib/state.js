/*
  This library is used to manage the state of the app. State is managed with
  a JSON file. The file is opened at the start of the app and updated
  periodically as the app runs.

  The primary use of the state is to save the last IPFS hash used to retrieve
  the website, in case there are issues connecting to the BCH infrastructure.
*/

const jsonFiles = require('./utils/json-files')
const config = require('../../config')
const JSON_FILE = config.stateFileName
const JSON_PATH = `${__dirname}/../../config/${JSON_FILE}`
let currenState

let _this

class STATE {
  constructor () {
    // Get last state if exist
    try {
      require.resolve(`../../config/${JSON_FILE}`) // verify if exist state.json
      currenState = require(`../../config/${JSON_FILE}`)
    } catch (error) {
      currenState = null
    }

    _this = this

    _this.state = {}

    if (currenState) _this.state = currenState
  }

  // Set latest  hash in state json
  async setLastHash (lastHash) {
    if (!lastHash) throw new Error(`Hash is required`)
    if (typeof lastHash !== 'string') throw new Error(`Hash must be a string`)
    const context = _this.state

    try {
      context.lastHash = lastHash
      await jsonFiles.writeJSON(context, JSON_PATH)
      return true
    } catch (error) {
      throw new Error('Error trying to write state json')
    }
  }

  // get the last hash saved to the state file.
  async getLastHash () {
    try {
      const lastHash = await jsonFiles.readJSON(JSON_PATH)
      if (!lastHash.lastHash) throw new Error('lastHash not found')
      return lastHash.lastHash
    } catch (error) {
      throw new Error('state.json not found!')
    }
  }
}
module.exports = STATE
