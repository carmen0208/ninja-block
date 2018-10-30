const crypto = require('crypto')
const elliptic = require('elliptic')
const SALT = 'f3c2ce176290b0c384cb4881eb714f2db58f630c33863d91c9bedf58d36007db'
const EdDSA = elliptic.eddsa
const ec = new EdDSA('ed25519')

class CryptoUtil {

  static createHashFromPassword(password) {
    const hash = crypto.createHash('sha256').update(password).digest('hex')
    return hash
  }

  // wallet secret is get a passwordHash as a input, using pbkdf2Sync crypto to create an secret
  static secretGeneration(passwordHash) {
    const secret = crypto.pbkdf2Sync(passwordHash, SALT, 10000, 512, 'sha512').toString('hex');
    // console.log(crypto.pbkdf2Sync(passwordHash, SALT, 10000, 512, 'sha512'))
    // console.log(secret)
    return secret
  }

  static generateSecretKeyPairFromSecret(seed) {
    const keyPair = ec.keyFromSecret(seed)
    console.log(`Public key: \n${elliptic.utils.toHex(keyPair.getPublic())}`)
    return keyPair
  }

  static toHex(data) {
    return elliptic.utils.toHex(data)
  }
}

module.exports = CryptoUtil