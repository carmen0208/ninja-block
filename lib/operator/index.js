const R = require('ramda')
const Wallets = require('./wallets')
const Wallet = require('./wallet')
const TransactionBuilder = require('./transactionBuilder')
const Db = require('../util/db')
const OPERATOR_FILE = 'wallets.json'

class Operator {
  constructor (dbName, blockchain) {
    this.db = new Db('data/' + dbName + '/' + OPERATOR_FILE, new Wallets())
    this.wallets = this.db.read(Wallets)

    this.blockchain = blockchain
  }

  createWalletFromPassword (password) {
    const newWallet = new Wallet(password)
    return this.addWallet(newWallet)
  }

  addWallet (wallet) {
    this.wallets.push(wallet)
    this.db.write(this.wallets)
    return wallet
  }

  generateAddressForWallet (walletId) {
    const wallet = this.getWalletById(walletId)
    const address = wallet.generateAddress()
    this.db.write(this.wallets)
    return address
  }
  getWalletById (walletId) {
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
