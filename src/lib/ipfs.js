const IPFS = require('ipfs')
const fs = require('fs')
const config = require('../../config')
const concat = require('it-concat')

let ipfs

const em = require('./utils/eventJS')

async function startIPFS () {
  try {
    // starting ipfs node
    console.log('Starting...!')

    const ipfsOptions = {
      repo: './ipfs-data/ipfs-config/node',
      start: true,
      EXPERIMENTAL: {
        pubsub: true
      },
      relay: {
        enabled: true, // enable circuit relay dialer and listener
        hop: {
          enabled: true // enable circuit relay HOP (make this node a relay)
        }
      }
    }

    if (
      config.ipfsPort1 &&
      typeof config.ipfsPort1 === 'number' &&
      config.ipfsPort2 &&
      typeof config.ipfsPort2 === 'number'
    ) {
      // Adding ports to ipfs config
      ipfsOptions.config = {
        Addresses: {
          Swarm: [
            `/ip4/0.0.0.0/tcp/${config.ipfsPort1}`,
            `/ip4/127.0.0.1/tcp/${config.ipfsPort2}/ws`,
            `/ip4/127.0.0.1/tcp/4001/ipfs/QmbgP7nmMsqCxVEkywt8aSdyoBL9hYNyP1Uw97cVhThn3L`,
            // Decatur store.
            `/dns/decatur.hopto.org/tcp/7700/ipfs/Qma7UL7kBPPukRXfvES89Ce772USyfUaYxaP3msKTdNcyJ`,
            // PSF IPFS Bootstrap Server
            `/ip4/116.203.193.74/tcp/4001/ipfs/QmNZktxkfScScnHCFSGKELH3YRqdxHQ3Le9rAoRLhZ6vgL`
          ],
          API: `/ip4/127.0.0.1/tcp/${config.ipfsPort1}`,
          Gateway: `/ip4/127.0.0.1/tcp/${config.ipfsPort2}`
        }
      }
    }

    // instantiating  ipfs node
    ipfs = await IPFS.create(ipfsOptions)
    em.emit('test')
    return ipfs
  } catch (err) {
    console.error(`Error in ipfs.js/startIPFS()`)
    throw err
  }
}

async function getContent (ipfsNode, hash) {
  // Get the latest content from the IPFS network.
  console.log('Starting Download')
  try {
    if (!hash || typeof hash !== 'string') {
      throw new Error('Hash must be a string!')
    }
    const pathStore = `${process.cwd()}/ipfs-data/` // Path to store new ipfs-data
    const files = []
    // iterate files
    for await (const file of ipfsNode.get(hash)) {
      const path = `${pathStore}${file.path}`
      files.push(file)

      if (!file.content) {
        // Is Folder
        if (file.type === 'dir') {
          // create folder
          fs.mkdirSync(path, { recursive: true })
        }
        continue
      }

      // BufferArray
      const content = await concat(file.content)
      // Get Buffer
      const data = content.slice(0, content.length)

      if (file.type === 'file') {
        // create file
        fs.writeFileSync(path, data)
      }
    }
    return files
  } catch (error) {
    console.log('error downloading', error)
    // wlogger.error('Error in lib/ipfs.js/getContent()')
    throw error
  }
}
// Adds an IPFS object to the pinset and also stores it to the IPFS repo.

async function pinAdd (ipfsNode, hash) {
  ipfsNode.pin.add(hash, function (err) {
    if (err) return err
  })

  // List all the objects pinned to local storage or under a specific hash.
  /* ipfsNode.pin.ls(hash,function (err, pinset) {
        if (err) {
            throw err
        }
        console.log(pinset)
    }) */
}

module.exports = { startIPFS, getContent, pinAdd, ipfs }
