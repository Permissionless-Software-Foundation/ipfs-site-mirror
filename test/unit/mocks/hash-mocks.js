/*
  A mocking library for util.js unit tests.
  A mocking library contains data to use in place of the data that would come
  from an external dependency.
*/

'use strict'

const mockDetails = {
  page: 1,
  totalPages: 1,
  itemsOnPage: 1001,
  address: 'bitcoincash:qzx5w7zqm5geykxaydvfpctxf9qklv4ylg7wwxckkg',
  balance: '209279',
  totalReceived: '9074519',
  totalSent: '8865240',
  unconfirmedBalance: '0',
  unconfirmedTxs: 0,
  txs: 56,
  txids: [
    '0c7756f68af2b959aa8f657a43d0a0ac0d40d827b0ade9bd16afa1865da77294',
    '76410f80191fa886895a49bf7c9a3aa92aeb79c158c20bf4032779f218a237bb',
    'd401c86d87e1b64a29a2a4b577b2ed500d7fea194c0753108cb3087b40474867',
    '9428b1dd015ff0bbb961655c77048b2cb82e46c6ea02a75b620a92844fa38077'
  ]
}

const mockElectruxTxs = {
  success: true,
  transactions: [
    {
      height: 610320,
      tx_hash:
        '21f8f6b3f83c0f86ee22104035b5a2830e9d7ad7188aba2a4c343128016a648b'
    },
    {
      height: 610320,
      tx_hash:
        '4e8f4f8c336c8a0390f5334fa965629e848d6494a74f00670dc7c10ba1550055'
    },
    {
      height: 639282,
      tx_hash:
        'e6dcc6f96ec02286687c003cbd3da891c74e128e26709029a4c05580781281fc'
    },
    {
      height: 639328,
      tx_hash:
        '52c774a12415dce8768525af645a5374ef87ce03b09da827689495324065c158'
    },
    {
      height: 639432,
      tx_hash:
        '413cbb7c0aa34912a3bbbe5d1f12123af6ff1ffc84caff20e63febf1f76c42a8'
    },
    {
      height: 666211,
      tx_hash:
        '76931f09a59cb7dcf2c714afe629b60d4c5fe1e28d3b577d0beb6ae0a853630b'
    },
    {
      height: 666216,
      tx_hash:
        '088df1320f7de69f02abb8854c83130f8b5aacb4d32b798d1bddbd4fa1a862e8'
    },
    {
      height: 666217,
      tx_hash:
        '277c33e8f4657be0b701f1d2d21a6708433ae3ea53ca3c0fbcc2090857a5548d'
    },
    {
      height: 666228,
      tx_hash:
        'bc5d04e2dbab3abe2236a9277a9523816d6f1380db5e8bb26ba74e7545e578a2'
    },
    {
      height: 666232,
      tx_hash:
        '54fc92d79af8d108739df036aea8886eac1f82819143b6eafcc783a9a0861126'
    },
    {
      height: 666234,
      tx_hash:
        'd899a76a21fafccd8ef0b7ec75f7476a0834dbfa6ab9e38883860fd49bd457e4'
    },
    {
      height: 666295,
      tx_hash:
        '3be207e8f5afcb26c8a5b7dbbc7d25ac2b91cc0b47e6c0002c4a9f11ea9b8b8c'
    },
    {
      height: 666295,
      tx_hash:
        'c4600937bd195b2a7261756f56feda03ef9c2e4eb656d46dc030f47c7a17f55e'
    },
    {
      height: 666571,
      tx_hash:
        'c3f7460983b6279fb6d864815de32b0f8b3b93dd06f67177003c0a383d6d1aad'
    },
    {
      height: 666572,
      tx_hash:
        'e99c22bace7ca16d1a91ca165fad3fec637af77a8365286ea9a51149b300200b'
    },
    {
      height: 666795,
      tx_hash:
        '40b8e6f92ce3e1dcdd6978cf7a1279c2b4d60517260221a1455445a6e45c9eb5'
    },
    {
      height: 669029,
      tx_hash:
        '9c2e78143ecc1a182b0eb73cec4cb01cbfe853bd4a3a20d59ffe17eb928c1c39'
    },
    {
      height: 669135,
      tx_hash:
        '1e7fcefd16b20ce678875ff4511d023c24a3002fdd980a43bac646d84e74e5c7'
    },
    {
      height: 669174,
      tx_hash:
        '17dd7f62452162e2aabf8ad3bf367f00bb15f0a1a1085e53bccf5f4e04bd8244'
    },
    {
      height: 669247,
      tx_hash:
        '3213504417e8a8583d7e0502b6ce15a4f0c939a6bc690697211f9a259ab58407'
    }
  ]
}

const mockThitx = {
  txid: '0c7756f68af2b959aa8f657a43d0a0ac0d40d827b0ade9bd16afa1865da77294',
  hash: '0c7756f68af2b959aa8f657a43d0a0ac0d40d827b0ade9bd16afa1865da77294',
  version: 2,
  size: 263,
  locktime: 0,
  vin: [[Object]],
  vout: [
    {
      value: 0.0016071,
      n: 0,
      scriptPubKey: {
        asm:
          'OP_DUP OP_HASH160 8d477840dd119258dd235890e16649416fb2a4fa OP_EQUALVERIFY OP_CHECKSIG',
        hex: '76a9148d477840dd119258dd235890e16649416fb2a4fa88ac',
        reqSigs: 1,
        type: 'pubkeyhash',
        addresses: ['bitcoincash:qzx5w7zqm5geykxaydvfpctxf9qklv4ylg7wwxckkg']
      }
    },
    {
      value: 0,
      n: 1,
      scriptPubKey: {
        asm:
          'OP_RETURN 621 495046532055504441544520516d6170507a4c6571314770736d6536554a467072593259354b476a4e3762654b734773773735486167386f6161',
        hex:
          '6a026d023a495046532055504441544520516d6170507a4c6571314770736d6536554a467072593259354b476a4e3762654b734773773735486167386f6161',
        type: 'nulldata'
      }
    }
  ],
  hex:
    '0200000001bb37a218f2792703f40bc258c179eb2aa93a9a7cbf495a8986a81f19800f4176000000006a4730440220530df24547be374c80e78afa67ae6d78cbb9bc0fe3a815d1d867c81f0627220502201f1880d589519a2c1ec2267b089784eb99f473414e8684eb891cff105d3ce75b41210384f709173547c1cc7ecaf452e6b9a53aa3602a625e681e146e692d9f179a8d63ffffffff02c6730200000000001976a9148d477840dd119258dd235890e16649416fb2a4fa88ac00000000000000003f6a026d023a495046532055504441544520516d6170507a4c6571314770736d6536554a467072593259354b476a4e3762654b734773773735486167386f616100000000',
  blockhash: '000000000000000000ce5cfcb0952cfd7581dcb237707acb2e65efb6342439cb',
  confirmations: 457,
  time: 1572827825,
  blocktime: 1572827825
}

module.exports = {
  mockDetails,
  mockThitx,
  mockElectruxTxs
}
