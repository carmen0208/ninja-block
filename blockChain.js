const Block = require('./block')

class BlockChain {
  constructor() {
    this.chain = [this.createInitialBlock()]
  }

  createInitialBlock() {
    return new Block('Initial Block', '0')
  }

  getLastBlock() {
    return this.chain[this.chain.length - 1]
  }
  addBlock(newBlock) {
    // console.log(this.getLastBlock())
    newBlock.index = this.chain.length
    newBlock.previousHash = this.getLastBlock().hash
    newBlock.hash = newBlock.calculateHash()
    this.chain.push(newBlock)
  }

  inChainValid() {
    for(let i=1; i<this.chain.length; i++ ) {
      const currentBlock = this.chain[i]
      const previousBlock = this.chain[i - 1]
      if(currentBlock.previousHash !== previousBlock.hash) {
        return false
      }
      if(currentBlock.hash !== currentBlock.calculateHash()) {
        // console.log(currentBlock.hash)
        // console.log(currentBlock.calculateHash())
        return false
      }
    }
    return true
  }
}

module.exports = BlockChain