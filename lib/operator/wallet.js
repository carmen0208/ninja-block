const R = require('ramda')
const cryptoUtil = require('../util/cryptoUtil')
class Wallet {
  constructor(password) {
    this.passwordHash= this.hash(password)
    this.secret = this.secret(this.passwordHash)
    this.keyPairs = []
  }

  hash(password) {
    return cryptoUtil.createHashFromPassword(password)
    // crypto.createHash('sha256').update(password).digest('hex')
  }

  secret(hash) {
    return cryptoUtil.secretGeneration(hash)
  }

  generateAddress() {
    const lastKeyPair = R.last(this.keyPairs)
    // createNewKeyPair(address) according to last keyPair(address) or secret
    const seed = lastKeyPair == null ? this.secret : cryptoUtil.secretGeneration(R.propOr(null, 'secretKey', lastKeyPair))
    // console.log(`lastKeyPair = ${lastKeyPair}, seed = ${seed}`)
    const newKeyPairRaw = cryptoUtil.generateSecretKeyPairFromSecret(seed)
    const newKeyPair = {
      index: this.keyPairs.length+1,
      secretKey: cryptoUtil.toHex(newKeyPairRaw.getSecret()),
      publicKey: cryptoUtil.toHex(newKeyPairRaw.getPublic())
    }
    this.keyPairs.push(newKeyPair)
    console.log('this.keyPairs')
    console.log(this.keyPairs)
    return newKeyPair.publicKey
  }
}

module.exports = Wallet