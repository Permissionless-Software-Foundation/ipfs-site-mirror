/*
  A mocking library for util.js unit tests.
  A mocking library contains data to use in place of the data that would come
  from an external dependency.
*/

"use strict";

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
    txids:
        ['0c7756f68af2b959aa8f657a43d0a0ac0d40d827b0ade9bd16afa1865da77294',
            '76410f80191fa886895a49bf7c9a3aa92aeb79c158c20bf4032779f218a237bb',
            'd401c86d87e1b64a29a2a4b577b2ed500d7fea194c0753108cb3087b40474867',
            '9428b1dd015ff0bbb961655c77048b2cb82e46c6ea02a75b620a92844fa38077'
        ]
};

const mockThitx = {
    txid: '0c7756f68af2b959aa8f657a43d0a0ac0d40d827b0ade9bd16afa1865da77294',
    hash: '0c7756f68af2b959aa8f657a43d0a0ac0d40d827b0ade9bd16afa1865da77294',
    version: 2,
    size: 263,
    locktime: 0,
    vin: [[Object]],
    vout: [
        {
            value: 0.0016071, n: 0,
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
            value: 0, n: 1,
            scriptPubKey: {
                asm: 'OP_RETURN 621 495046532055504441544520516d6170507a4c6571314770736d6536554a467072593259354b476a4e3762654b734773773735486167386f6161',
                hex: '6a026d023a495046532055504441544520516d6170507a4c6571314770736d6536554a467072593259354b476a4e3762654b734773773735486167386f6161',
                type: 'nulldata'
            }
        }
    ]
    ,
    hex: '0200000001bb37a218f2792703f40bc258c179eb2aa93a9a7cbf495a8986a81f19800f4176000000006a4730440220530df24547be374c80e78afa67ae6d78cbb9bc0fe3a815d1d867c81f0627220502201f1880d589519a2c1ec2267b089784eb99f473414e8684eb891cff105d3ce75b41210384f709173547c1cc7ecaf452e6b9a53aa3602a625e681e146e692d9f179a8d63ffffffff02c6730200000000001976a9148d477840dd119258dd235890e16649416fb2a4fa88ac00000000000000003f6a026d023a495046532055504441544520516d6170507a4c6571314770736d6536554a467072593259354b476a4e3762654b734773773735486167386f616100000000',
    blockhash: '000000000000000000ce5cfcb0952cfd7581dcb237707acb2e65efb6342439cb',
    confirmations: 457,
    time: 1572827825,
    blocktime: 1572827825
}

module.exports = {
    mockDetails,
    mockThitx
};