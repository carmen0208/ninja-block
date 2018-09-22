const Block = require('./block')
const BlockChain = require('./blockChain')
// let ninjaBlock = new Block({amount:100})
// let ninjaBlock2 = new Block({amount: 500}, ninjaBlock.hash)
// console.log(ninjaBlock)
// console.log(ninjaBlock2)

let ninjaBlockChain = new BlockChain()
ninjaBlockChain.addBlock(new Block({amount:100}))
ninjaBlockChain.addBlock(new Block({amount:200}))
console.log(ninjaBlockChain)
// console.log(JSON.stringify(ninjaBlockChain))
// ninjaBlockChain.chain.forEach(element => {
//   console.log(element.data)
// });
console.log(`if blockchain is still valid: ${ninjaBlockChain.inChainValid()}`)

console.log('Warning: Blockchain has been changed')

ninjaBlockChain.chain[1].data ={amout:500}
console.log(`if blockchain is still valid: ${ninjaBlockChain.inChainValid()}`)