/*
  Unit tests for the util.js utility library.
*/

// npm libraries
const chai = require('chai')
const sinon = require('sinon')
// Locally global variables.
const assert = chai.assert

// Mocking data libraries.
const mockData = require('./mocks/hash-mocks')

// Unit under test
const BCHJS = require('../../src/lib/bch')
const bchjs = new BCHJS(null, 1)

const STATE = require('../../src/lib/state')
const state = new STATE()

describe('#bch.js', () => {
  let sandbox
  // Restore the sandbox before each test.
  before(async () => {
    // create state.-test.json
    const hash = 'QmRsy3diLrXTTMFD1D7yYyY1dRnkVzSW9ugPVnnueZdOYT'
    await state.setLastHash(hash)
  })
  beforeEach(() => (sandbox = sinon.createSandbox()))
  afterEach(() => sandbox.restore())

  describe('findHash function', () => {
    it('Should retrieve hash', async () => {
      sandbox
        .stub(bchjs.bchjs.Electrumx, 'transactions')
        .resolves(mockData.mockElectruxTxs)

      sandbox
        .stub(bchjs.bchjs.RawTransactions, 'getRawTransaction')
        .resolves(mockData.mockThitx)

      const hash = await bchjs.findHash()
      console.log(hash)

      assert.isString(hash)
    })
  })

  describe('pRetryGetHash function', async function () {
    this.timeout(20000)
    it('Should use last hash from state.json if it exist', async () => {
      // mocks empty  for throw error
      sandbox.stub(bchjs.bchjs.Electrumx, 'transactions').resolves({})

      const lastHash = await state.getLastHash()
      const hash = await bchjs.pRetryGetHash()

      assert.isString(hash)
      assert.isString(lastHash)
      assert.equal(lastHash, hash)
    })

    it('Should Retrieve hash from pretry function', async () => {
      sandbox
        .stub(bchjs.bchjs.Electrumx, 'transactions')
        .resolves(mockData.mockElectruxTxs)

      sandbox
        .stub(bchjs.bchjs.RawTransactions, 'getRawTransaction')
        .resolves(mockData.mockThitx)

      const lastHash = await state.getLastHash()
      console.log(lastHash)
      const hash = await bchjs.pRetryGetHash()
      console.log(hash)

      assert.isString(hash)
      assert.isString(lastHash)
      assert.notEqual(lastHash, hash)
    })
  })
})
