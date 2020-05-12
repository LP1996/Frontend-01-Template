const net = require('net')
const { ResponseParser } = require('./response')

const parser = new ResponseParser()

module.exports = class Request {
  // method, url = host + port + path
  // body: k/v
  // headers
  constructor(options) {
    this.method = options.method || 'GET'
    this.host = options.host
    this.port = options.port || 80
    this.path = options.path || '/'
    this.body = options.body || {}
    this.headers = options.headers || {}

    if (!this.headers['Content-Type']) {
      this.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    }

    if (this.headers['Content-Type'] === 'application/json') {
      this.bodyText = JSON.stringify(this.body)
    }

    if (this.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
      this.bodyText = Object.keys(this.body).map(key => `${key}=${encodeURIComponent(this.body[key])}`).join('&')
    }

    this.headers['Content-Length'] = this.bodyText.length
  }

  send(connection) {
    let resolve
    let reject
    if (connection) {
      connection.write(this.toString())
    } else {
      connection = net.createConnection({ port: this.port }, () => {
        connection.write(this.toString())
      })
    }
    
    connection.on('data', data => {
      resolve(data.toString())
      parser.receive(data.toString())
      console.log(parser)
      connection.end()
    })

    connection.on('error', err => {
      connection.end()
      reject(err)
    })

    return new Promise((res, rej) => {
      resolve = res
      reject = rej
    })
  }

  toString() {
    return `${this.method} ${this.path} HTTP/1.1\r
${Object.keys(this.headers).map(key => `${key}: ${this.headers[key]}`).join('\r\n')}\r
${this.bodyText}
    `
  }
}