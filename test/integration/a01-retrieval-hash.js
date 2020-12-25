/*
  Unit tests for the util.js utility library.
*/

// npm libraries
const chai = require("chai");

// Locally global variables.
const assert = chai.assert;

// Unit under test
const BCHJS = require("../../src/lib/bch");
const bchjs = new BCHJS(null, 1);

const fs = require('fs')
// Function to delete state-test.json
const deleteState = () => {
  try {
    // Delete state if exist
    fs.unlinkSync('config/state-test.json')
  } catch (error) {
   // throw error
  }
}
describe("#bch.js", () => { 
  before(() => { deleteState() });
    describe("pRetryGetHash function", async function () {

      it("Should Retrieve hash from pretry function", async () => {

        
        const hash = await bchjs.pRetryGetHash();
        assert.isString(hash)
  
      })
    })
    describe("findHash function", () => {
        it("Should retrieve hash", async function ()  {
                this.timeout(20000);

                const hash = await bchjs.findHash();
                assert.isString(hash);
           
        })
    });


});
