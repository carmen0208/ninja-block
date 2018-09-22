const SHA256 = require('crypto-js/sha256');
class Block {
  constructor(data, index=0, previousHash='') {
    this.index = index
    this.timestamp = new Date().toISOString().slice(0, 10);
    this.data = data
    this.previousHash = previousHash
    this.hash = this.calculateHash()
  }
  calculateHash() {
    // console.log(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data))
    return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
  }
}

module.exports = Block
