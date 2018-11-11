const fs = require('fs-extra')
const path = require('path')
class Db {
  constructor (filePath, defaultData) {
    this.filePath = filePath
    this.defaultData = defaultData
  }

  read () {
    if (!fs.existsSync(this.filePath)) {
      return this.defaultData
    }
    const content = fs.readFileSync(this.filePath)
    return JSON.parse(content) || this.defaultData
  }

  write (data) {
    fs.ensureDirSync(path.dirname(this.filePath))
    fs.writeFileSync(this.filePath, JSON.stringify(data))
  }
}

module.exports = Db
