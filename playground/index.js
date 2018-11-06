const Block = require("../lib/blockchain/block");
const BlockChain = require("../lib/blockchain/blockChain");

let ninjaBlockChain = new BlockChain();
ninjaBlockChain.addBlock(new Block({amount:100}))
ninjaBlockChain.addBlock(new Block({amount:200}))
console.log(ninjaBlockChain)
console.log(`if blockchain is still valid: ${ninjaBlockChain.inChainValid()}`)
