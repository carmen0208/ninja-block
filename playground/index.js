// const Block = require('../lib/blockchain/block')
const BlockChain = require('../lib/blockchain/blockChain')
// const Transaction = require('../lib/blockchain/transaction')
// let ninjaBlock = new Block({amount:100})
// let ninjaBlock2 = new Block({amount: 500}, ninjaBlock.hash)
// console.log(ninjaBlock)
// console.log(ninjaBlock2)

// let ninjaBlockChain = new BlockChain()
// // ninjaBlockChain.addBlock(new Block({amount:100}))
// // ninjaBlockChain.addBlock(new Block({amount:200}))
// // console.log(ninjaBlockChain)
// // console.log(`if blockchain is still valid: ${ninjaBlockChain.inChainValid()}`)

// // console.log('Warning: Blockchain has been changed')
// // ninjaBlockChain.chain[1].data ={amout:500}
// // console.log(`if blockchain is still valid: ${ninjaBlockChain.inChainValid()}`)

// ninjaBlockChain.createTransaction(new Transaction('carmen', 'nico', '520'))
// ninjaBlockChain.createTransaction(new Transaction('nico', 'carmen', '1314'))

// ninjaBlockChain.miningTransaction('miner-reward-address')
// console.log('-------------- mining -------------------')
// console.log(ninjaBlockChain)
// console.log(ninjaBlockChain.getBalanceFromAddress('miner-reward-address'))

// console.log('-------------- mining again -------------------')
// ninjaBlockChain.miningTransaction('miner-reward-address')
// console.log(ninjaBlockChain.getBalanceFromAddress('miner-reward-address'))

// const Wallet = require('../lib/operator/wallet')
// const wallet = new Wallet('Carmen')
// console.log(wallet)
// wallet.generateAddress()
// wallet.generateAddress()
const name = 'ninja'
const blockchain = new BlockChain(name)
const Operator = require('../lib/operator/index')

const operator = new Operator(name, blockchain)
const wallet = operator.createWalletFromPassword('carmen')
// console.log(wallet)

const fromAddressId = operator.generateAddressForWallet(wallet.id) // wallet.generateAddress()
const toAddressId = operator.generateAddressForWallet(wallet.id)
const fromAddress = wallet.getAddressByPublicKey(fromAddressId)
// console.log(wallet)
// console.log(fromAddress)
const transaction = operator.createTransaction(wallet.id, fromAddress, toAddressId, 100)
console.log(transaction)
console.log(transaction.data.inputs)
console.log(transaction.data.outputs)
