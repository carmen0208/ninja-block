const R = require('ramda')
const Wallet = require('./wallet')
const TransactionBuilder = require('./transactionBuilder')
class Operator {
  constructor (wallets) {
    this.wallets = []
  }
  createWalletFromPassword (password) {
    const newWallet = new Wallet(password)
    this.wallets.push(newWallet)
    return newWallet
  }

  getWalletFromId (walletId) {
    return R.find((wallet) => { return wallet.id === walletId }, this.wallets)
  }

  createTransaction (walletId, fromAddress, toAddressId, amount) {
    // TODO: get UTXO from this fromAddressId

    // const wallet = this.getWalletFromId(walletId)

    const transaction = new TransactionBuilder()
    transaction.from(fromAddress)
    transaction.to(toAddressId, amount)
    const secretKey = fromAddress.secretKey
    // console.log(`secretKey = : ${secretKey}`)
    transaction.sign(secretKey)
    return transaction.build()
  }
}

module.exports = Operator
