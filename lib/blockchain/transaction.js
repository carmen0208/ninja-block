const CryptoUtil = require('../util/cryptoUtil')
const R = require('ramda')

class Transaction {
  // Deprecated: This is a simple version of the transaction
  // constructor (fromAddress, toAddress, amount) {
  //   this.fromAddress = fromAddress
  //   this.toAddress = toAddress
  //   this.amount = amount
  // }
  constructor () {
    this.id = null
    this.hash = null
    this.type = null
    this.data = {
      inputs: [],
      outputs: []
    }
  }

  toHash () {
    // INFO: There are different implementations of the hash algorithm, for example: https://en.bitcoin.it/wiki/Hashcash
    return CryptoUtil.hash(this.id + this.type + JSON.stringify(this.data))
  }

  static fromJson (data) {
    let transaction = new Transaction()
    R.forEachObjIndexed((value, key) => {
      transaction[key] = value
    }, data)
    transaction.hash = transaction.toHash()
    return transaction
  }
}
module.exports = Transaction
