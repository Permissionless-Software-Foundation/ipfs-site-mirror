const IPFS = require("ipfs");
const shell = require('shelljs')
const { globSource } = IPFS

async function addFile() {
    const ipfsOptions = {
        repo: "../ipfs-data/ipfs-config/nodeUpload",
        start: true,
        EXPERIMENTAL: {
            pubsub: true
        },
        config: {
            Addresses: {
                Swarm: ["/ip4/0.0.0.0/tcp/4006",
                    "/ip4/127.0.0.1/tcp/4007/ws"],
                API: "/ip4/127.0.0.1/tcp/4008",
                Gateway: "/ip4/127.0.0.1/tcp/4009"
            }
        },
        relay: {
            enabled: true, // enable circuit relay dialer and listener
            hop: {
                enabled: true // enable circuit relay HOP (make this node a relay)
            }
        }
    };

    const ipfs_node = await IPFS.create(ipfsOptions)
    console.log('Node is ready to use but not started!')

    try {
        await ipfs_node.start()
        console.log('Node started!')

        const path = './util/ipfs-upload'

        const hashes = []

        for await (const file of ipfs_node.add(globSource(path, { recursive: true }))) {
            hashes.push(file.cid.toString())
            console.log('Added file:', file.path, file.cid.toString())
        }

        const lastHash = hashes.length <= 2 ?
            hashes[hashes.length - 1] : //For one file to upload
            hashes[hashes.length - 2]

        console.log("Publishing last hash : ", lastHash)
        shell.exec(`memo-push -p ${lastHash}`);
    } catch (error) {
        console.error('ERROR!', error)
    }

    process.stdin.resume();

}

addFile();

