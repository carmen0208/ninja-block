const CryptoUtil = require('../util/cryptoUtil')
const Transaction = require('../blockchain/transaction')

class TransactionBuilder {
  constructor () {
    // this.listOfUTXO = null
    this.inputAddress = null
    this.outputAddress = null
    this.totalAmount = null
    this.secretKey = null
    this.type = 'regular'
  }

  from (inputAddress) {
    this.inputAddress = inputAddress
    return this
  }
  to (toAddress, amount) {
    this.outputAddress = toAddress
    this.totalAmount = amount
    return this
  }

  sign (secretKey) {
    this.secretKey = secretKey
    return this
  }
  build () {
    this.checkReuiredInfo()
    // TODO calculate with totalAmounst and rest of the money

    const inputs = this.constructInputs()
    // console.log(inputs)

    const outputs = this.constructOutputs()
    // console.log(outputs)
    return Transaction.fromJson({
      id: CryptoUtil.randomId(64),
      hash: null,
      type: this.type,
      data: {
        inputs,
        outputs
      }
    })
  }

  checkReuiredInfo () {
    // if (this.listOfUTXO == null) throw new Error('It\'s necessary to inform a list of unspent output transactions.')
    if (this.inputAddress == null) throw new Error('It\'s necessary to inform a list of unspent output transactions.')
    if (this.outputAddress == null) throw new Error('It\'s necessary to inform the destination address.')
    if (this.totalAmount == null) throw new Error('It\'s necessary to inform the transaction value.')
  }

  constructInputs () {
    const txiHash = CryptoUtil.hash({address: this.inputAddress.publicKey})
    const keyPair = CryptoUtil.generateSecretKeyPairFromSecret(this.secretKey)
    const signature = CryptoUtil.signHash(keyPair, txiHash)

    const inputs = []
    inputs.push({
      amount: this.totalAmount,
      address: this.inputAddress.publicKey,
      signature: signature
    })
    return inputs
  }
  constructOutputs () {
    const outputs = []
    outputs.push({
      amount: this.totalAmount,
      address: this.outputAddress
    })
    return outputs
  }
}

module.exports = TransactionBuilder
