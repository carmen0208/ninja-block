const crypto = require('crypto')
const elliptic = require('elliptic')
const SALT = 'f3c2ce176290b0c384cb4881eb714f2db58f630c33863d91c9bedf58d36007db'
const EdDSA = elliptic.eddsa
const ec = new EdDSA('ed25519')

class CryptoUtil {
  static hash (password) {
    const passwordString = typeof (password) === 'object' ? JSON.stringify(password) : password.toString()
    const hash = crypto.createHash('sha256').update(passwordString).digest('hex')
    return hash
  }

  static randomId (size = 64) {
    return crypto.randomBytes(Math.floor(size / 2)).toString('hex')
  }

  // wallet secret is get a passwordHash as a input, using pbkdf2Sync crypto to create an secret
  static secretGeneration (passwordHash) {
    const secret = crypto.pbkdf2Sync(passwordHash, SALT, 10000, 512, 'sha512').toString('hex');
    // console.log(crypto.pbkdf2Sync(passwordHash, SALT, 10000, 512, 'sha512'))
    // console.log(secret)
    return secret
  }

  static generateSecretKeyPairFromSecret (seed) {
    const keyPair = ec.keyFromSecret(seed)
    // console.log(`Public key: \n${elliptic.utils.toHex(keyPair.getPublic())}`)
    return keyPair
  }

  static signHash (keyPair, messageHash) {
    let signature = keyPair.sign(messageHash).toHex().toLowerCase()
    return signature
  }

  static toHex (data) {
    return elliptic.utils.toHex(data)
  }
}

module.exports = CryptoUtil
