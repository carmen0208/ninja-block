const R = require('ramda')
const cryptoUtil = require('../util/cryptoUtil')
class Wallet {
  constructor (password) {
    this.id = this.generatRandomId()
    this.passwordHash = this.hashFrom(password)
    this.secret = this.secret(this.passwordHash)
    this.keyPairs = []
  }

  hashFrom (password) {
    return cryptoUtil.hash(password)
    // crypto.createHash('sha256').update(password).digest('hex')
  }

  generatRandomId () {
    return cryptoUtil.randomId()
  }

  getSecretKeyByAddress (addressId) {
    return R.prop('secretKey',
      R.find(R.propEq('publicKey', addressId),
        this.keyPairs))
  }

  secret (hash) {
    return cryptoUtil.secretGeneration(hash)
  }

  generateAddress () {
    const lastKeyPair = R.last(this.keyPairs)
    // createNewKeyPair(address) according to last keyPair(address) or secret
    const seed = lastKeyPair == null ? this.secret : cryptoUtil.secretGeneration(R.propOr(null, 'secretKey', lastKeyPair))
    // console.log(`lastKeyPair = ${lastKeyPair}, seed = ${seed}`)
    const newKeyPairRaw = cryptoUtil.generateSecretKeyPairFromSecret(seed)
    const newKeyPair = {
      index: this.keyPairs.length + 1,
      secretKey: cryptoUtil.toHex(newKeyPairRaw.getSecret()),
      publicKey: cryptoUtil.toHex(newKeyPairRaw.getPublic())
    }
    this.keyPairs.push(newKeyPair)
    // console.log('this.keyPairs')
    // console.log(this.keyPairs)
    // console.log(`newKeyPair.publicKey: ${newKeyPair.publicKey}`)
    return newKeyPair.publicKey
  }

  getAddressByPublicKey (publicKey) {
    return R.find(R.propEq('publicKey', publicKey), this.keyPairs)
  }
}

module.exports = Wallet
