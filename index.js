const Block = require('./block')
const BlockChain = require('./blockChain')
const Transaction = require('./transaction')
// let ninjaBlock = new Block({amount:100})
// let ninjaBlock2 = new Block({amount: 500}, ninjaBlock.hash)
// console.log(ninjaBlock)
// console.log(ninjaBlock2)

let ninjaBlockChain = new BlockChain()
// ninjaBlockChain.addBlock(new Block({amount:100}))
// ninjaBlockChain.addBlock(new Block({amount:200}))
// console.log(ninjaBlockChain)
// console.log(`if blockchain is still valid: ${ninjaBlockChain.inChainValid()}`)

// console.log('Warning: Blockchain has been changed')
// ninjaBlockChain.chain[1].data ={amout:500}
// console.log(`if blockchain is still valid: ${ninjaBlockChain.inChainValid()}`)

ninjaBlockChain.createTransaction(new Transaction('carmen', 'nico', '520'))
ninjaBlockChain.createTransaction(new Transaction('nico', 'carmen', '1314'))

ninjaBlockChain.miningTransaction('miner-reward-address')
console.log('-------------- mining -------------------')
console.log(ninjaBlockChain)
console.log(ninjaBlockChain.getBalanceFromAddress('miner-reward-address'))

console.log('-------------- mining again -------------------')
ninjaBlockChain.miningTransaction('miner-reward-address')
console.log(ninjaBlockChain.getBalanceFromAddress('miner-reward-address'))

// console.log(ninjaBlockChain.getBalanceFromAddress())