/*
  This file is used to store unsecure, application-specific data common to all
  environments.
*/

module.exports = {
  port: process.env.PORT || 3210,
  BCHADDR: `bitcoincash:qpjkzcm3kgvu932w4lzj64ew4j4gqs3vxvt7ks55qc`,
  // BCHADDR: `bitcoincash:qppngav5s88devt4ypv3vhgj643q06tctcx8fnzewp`, // troutsblog.com
  stateFileName: `state.json`,
  ipfsPort1: 4002,
  ipfsPort2: 4003
}
