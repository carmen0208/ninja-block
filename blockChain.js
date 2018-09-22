const Block = require('./block')

class BlockChain {
  constructor() {
    this.chain = [this.createIintialBlock()]
  }

  createIintialBlock() {
    return new Block('Initial Block', '0')
  }

  getLastBlock() {
    return this.chain[this.chain.length - 1]
  }
  addBlock(newBlock) {
    // console.log(this.getLastBlock())
    newBlock.previousHash = this.getLastBlock().hash
    this.chain.push(newBlock)
  }
}

module.exports = BlockChain