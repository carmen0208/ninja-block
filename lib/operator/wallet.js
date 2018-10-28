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
}

module.exports = Wallet