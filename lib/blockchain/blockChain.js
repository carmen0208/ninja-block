const Block = require('./block')
const Transaction = require('./transaction')

class BlockChain {
  constructor () {
    this.chain = [this.createInitialBlock()]
    this.difficult = 3
    this.penddingTransaction = []
    this.miningReward = 50
  }

  createInitialBlock () {
    return new Block('Initial Block', '0')
  }

  getLastBlock () {
    return this.chain[this.chain.length - 1]
  }

  addBlock (newBlock) {
    newBlock.index = this.chain.length
    newBlock.previousHash = this.getLastBlock().hash
    // newBlock.hash = newBlock.calculateHash()
    newBlock.mineBlock(this.difficult)
    this.chain.push(newBlock)
  }

  inChainValid () {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i]
      const previousBlock = this.chain[i - 1]
      if (currentBlock.previousHash !== previousBlock.hash) {
        return false
      }
      if (currentBlock.hash !== currentBlock.calculateHash()) {
        // console.log(currentBlock.hash)
        // console.log(currentBlock.calculateHash())
        return false
      }
    }
    return true
  }
  miningTransaction (minerAddress) {
    this.penddingTransaction.push(
      new Transaction(null, minerAddress, this.miningReward)
    )

    let transBlock = new Block(
      this.penddingTransaction,
      this.chain.length,
      this.getLastBlock().hash
    )
    transBlock.mineBlock(this.difficult)

    console.log('Block successfully mined!')
    this.chain.push(transBlock)
    this.penddingTransaction = []
  }

  getBalanceFromAddress (address) {
    let balance = 0
    for (const block of this.chain) {
      for (const transaction of block.data) {
        if (transaction.fromAddress === address) {
          balance -= transaction.amount
        } else if (transaction.toAddress === address) {
          balance += transaction.amount
        }
      }
    }
    return balance
  }

  createTransaction (transaction) {
    this.penddingTransaction.push(transaction)
  }
}

module.exports = BlockChain
