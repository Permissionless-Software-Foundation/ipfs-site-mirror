const IPFS = require('ipfs')
const fs = require('fs')
const config = require('../../config')

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
            `/ip4/127.0.0.1/tcp/4001/ipfs/QmbgP7nmMsqCxVEkywt8aSdyoBL9hYNyP1Uw97cVhThn3L`
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

// Get the latest content from the IPFS network and Add into ipfs-data.
async function getContent (ipfsNode, hash) {
  try {
    em.emit('download-start')
    // Get the latest content from the IPFS network.
    return new Promise((resolve, reject) => {
      ipfsNode.get(hash, async function (err, files) {
        if (err) {
          em.emit('download-stop')
          reject(err)
        }

        const pathStore = `${process.cwd()}/ipfs-data/` // Path to store new ipfs-data
        files.forEach(async file => {
          // Map files
          //  console.log(file)
          if (file.type === 'file') {
            // Is File
            fs.writeFileSync(`${pathStore}${file.path}`, file.content)
          } else if (file.type === 'dir') {
            // Is Folder
            fs.mkdirSync(`${pathStore}${file.path}`, { recursive: true })
          }
        })
        em.emit('download-stop')
        resolve(true)
      })
    })
  } catch (err) {
    console.error(`Error in ipfs.js/getContent()`)
    throw err
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
