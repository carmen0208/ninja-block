const express = require('express')

class WebServer  {
  constructor() {
    this.app = express()
    this.app.get('/', (req, res) => {
      res.send('Hello World')
    })
  }

  listen(port) {
    this.app.listen(port, ()=> console.log(`Start BlockChain WebServer with port: ${port} !`))
  }
}

module.exports = WebServer