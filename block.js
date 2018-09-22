const SHA256 = require('crypto-js/sha256');
class Block {
  constructor(data, previousHash='') {
    this.data = data
    this.hash = this.calculateHash()
    this.previousHash = previousHash
  }
  calculateHash() {
    return SHA256(this.previousHash + this.data).toString()
  }
}

module.exports = Block
