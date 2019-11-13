const IPFS = require('ipfs')
const fs = require('fs')
const config = require('../../config')

let ipfs
let localStorage
// init local storage
if (typeof localStorage === 'undefined' || localStorage === null) {
  const LocalStorage = require('node-localstorage').LocalStorage
  localStorage = new LocalStorage('./localStorage')
}
async function startIPFS () {
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
  if (config.ipfsPort1 && typeof config.ipfsPort1 === 'number' &&
  config.ipfsPort2 && typeof config.ipfsPort2 === 'number') {
    // Adding ports to ipfs config
    ipfsOptions.config = {
      Addresses: {
        Swarm: [
          `/ip4/0.0.0.0/tcp/${config.ipfsPort1}`,
          `/ip4/127.0.0.1/tcp/${config.ipfsPort2}/ws`
        ],
        API: `/ip4/127.0.0.1/tcp/${config.ipfsPort1}`,
        Gateway: `/ip4/127.0.0.1/tcp/${config.ipfsPort2}`
      }
    }
  }
  // instantiating  ipfs node
  ipfs = new IPFS(ipfsOptions)
  return ipfs
}

// Get the latest content from the IPFS network and Add into ipfs-data.
async function getContent (ipfsNode, hash) {
  localStorage.setItem('ipfsDownloading', true)
  // Get the latest content from the IPFS network.
  return new Promise((resolve, reject) => {
    ipfsNode.get(hash, async function (err, files) {
      if (err) {
        localStorage.setItem('ipfsDownloading', false)
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
      localStorage.setItem('ipfsDownloading', false)
      resolve(true)
    })
  })
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

module.exports = { startIPFS, getContent, pinAdd }
