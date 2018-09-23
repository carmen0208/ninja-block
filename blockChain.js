const Block = require('./block')

class BlockChain {
  constructor() {
    this.chain = [this.createInitialBlock()]
    this.difficult = 4
  }

  createInitialBlock() {
    return new Block('Initial Block', '0')
  }

  getLastBlock() {
    return this.chain[this.chain.length - 1]
  }
  addBlock(newBlock) {
    newBlock.index = this.chain.length
    newBlock.previousHash = this.getLastBlock().hash
    // newBlock.hash = newBlock.calculateHash()
    newBlock.mineBlock(this.difficult)
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