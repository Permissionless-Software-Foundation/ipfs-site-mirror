# ipfs-web-server

A light-weight web server that serves any website published to IPFS. It monitors a
BCH address and automatically updates when new content is announced by that
address.

The purpose of this code repository is to enable **individuals** to leverage the [Streisand Effect](https://en.wikipedia.org/wiki/Streisand_effect) and mirror IPFS-based websites that may be threatened by censorship. Find out more at [UncensorablePublishing.com](https://uncensorablepublishing.com).

## Installation
- Clone and install dependencies:
```bash
git clone https://github.com/Permissionless-Software-Foundation/ipfs-site-mirror
cd ipfs-site-mirror
npm install
```

- Add the Bitcoin Cash address for the site you want to mirror to the [config/env/common.js](./config/env/common.js). The app will use this address to detect changes to the site and download those updates.

- `npm start`

### Development
The installation instructions above are for the development version using node.js directly.

- Add your BCH address
to [the config file](config/env/common.js). This
should be the same address associated with your [memo.cash](http://memo.cash) profile.

- Start the server: `npm start`

### Docker
It's also possible to run this application as a Docker container.

It's assumed that you are starting with a fresh installation of Ubuntu
18.04 LTS on a 64-bit machine.
It's also assumed that you are installing as a
[non-root user with sudo privileges](https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-18-04).

- Install Docker on the host system.
[This tutorial](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-16-04)
shows how to install Docker on a Ubuntu system. It's specifically targeted to
Digital Ocean's cloud servers, but should work for any Ubuntnu system.

- Install Docker Compose too.
[This tutorial](https://www.digitalocean.com/community/tutorials/how-to-install-docker-compose-on-ubuntu-16-04) shows how to do so on a Ubuntu system.

- Add your BCH address
to the [production/common.js file](production/common.js). This
should be the same address associated with your [memo.cash](http://memo.cash) profile.

- Build the image: `docker-compose build`

- Run the docker container: `docker-compose up`

- Or, run the docker container in daemon mode: `docker-compose up -d`


## License
[MIT](LICENSE.md)
