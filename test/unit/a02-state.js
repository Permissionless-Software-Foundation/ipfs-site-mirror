/*
  Unit tests for the util.js utility library.
*/

// npm libraries
const chai = require("chai");

// Locally global variables.
const assert = chai.assert;

// Mocking data libraries.
//const mockData = require("./mocks/state-mocks");

// Unit under test
const STATE = require("../../src/lib/state");
const stateLib = new STATE();

const fs = require('fs');

// Function to delete state-test.json
const deleteState = () => {
  try {
    // Delete state if exist
    fs.unlinkSync('config/state-test.json')
  } catch (error) {

  }
}
describe("#state.js", () => {
  // Delete state-test.json before starting unit test
  before(() => { deleteState() });

  describe("setLastHash function", () => {
    it("should throw error if hash is not a string", async () => {
      try {
        const hash = 1234

        await stateLib.setLastHash(hash);

        assert.equal(true, false, 'unexpected result')
      } catch (err) {
        assert.include(err.message, `Hash must be a string`)
      }
    })

    it("should throw error if hash is not defined", async () => {
      try {
        let hash;

        await stateLib.setLastHash(hash);

        assert.equal(true, false, 'unexpected result')
      } catch (err) {
        assert.include(err.message, `Hash is required`)
      }
    });
    it("should create state.json if it doesnt exist", async () => {

      try {
        const hash = "QmRsy3diLrXTTMFD1D7yYyY1dRnkVzSW9ugPVnnueZdPPQ";
        await stateLib.setLastHash(hash);
        assert.equal(true, 'unexpected result')
      } catch (err) {
        assert.include(err.message, `'unexpected result'`)
      }
    });
    it("should update state.json if it exist", async () => {

      try {
        const hash = "QmRsy3diLrXTTMFD1D7yYyY1dRnkVzSW9ugPVnnueZdOYT";
        await stateLib.setLastHash(hash);
        assert.equal(true, 'unexpected result')
      } catch (err) {
        assert.include(err.message, `'unexpected result'`)
      }
    });

  });
  describe("getLastHash function", () => {
    it("should get lasthash from  state.json if it exist", async () => {

      try {
        const lastState = await stateLib.getLastHash();
        assert.isString(lastState)

      } catch (err) {
        assert.include(err.message, `'state.json not found!'`)
      }
    });
    it("should trhow error if state.json does not exist", async () => {
      deleteState()
      try {
        await stateLib.getLastHash();
      } catch (err) {
        assert.include(err.message, 'not found!')
      }
    });
  })
});
