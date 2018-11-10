const SHA256 = require('crypto-js/sha256')
class Block {
  constructor (data, index = 0, previousHash = '') {
    this.index = index
    this.timestamp = new Date().toISOString().slice(0, 10)
    this.data = data
    this.previousHash = previousHash
    this.hash = this.calculateHash()
    // this value is adjusted by miners so that the hash of the block will be less than or equal to the current target
    // of the network
    this.nonce = 0
  }

  calculateHash () {
    return SHA256(
      this.index + this.previousHash +
        this.timestamp +
        JSON.stringify(this.data) +
        this.nonce
    ).toString()
  }

  mineBlock (difficulty) {
    while (this.hash.slice(0, difficulty) !== Array(difficulty + 1).join('0')) {
      this.nonce++
      this.hash = this.calculateHash()
    }
    console.log(this.hash)
  }
}

module.exports = Block
