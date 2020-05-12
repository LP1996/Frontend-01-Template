class ResponseParser {
  constructor() {
    this.WAITING_STATUS_LINE = 0
    this.WAITING_STATUS_LINE_END = 1
    this.WAITING_HEADER_NAME = 2
    this.WAITING_HEADER_VALUE = 3
    this.WAITING_HEADER_SPACE = 4
    this.WAITING_HEADER_LINE_END = 5
    this.WAITING_HEADER_BLOCK_END = 6
    this.WAITING_BODY = 7

    this.currentStatus = this.WAITING_STATUS_LINE
    this.statusLine = ''
    this.headers = {}
    this.headerName = ''
    this.headerValue = ''
    this.bodyParser = null
  }

  receive(string) {
    for (let i = 0; i < string.length; i++) {
      this.receiveChar(string.charAt(i))
    }
  }

  receiveChar(char) {
    if (this.currentStatus === this.WAITING_STATUS_LINE) {
      if (char === '\r') {
        this.currentStatus = this.WAITING_STATUS_LINE_END
        return
      } else {
        this.statusLine += char
      }
    }

    if (this.currentStatus === this.WAITING_STATUS_LINE_END) {
      if (char === '\n') {
        this.currentStatus = this.WAITING_HEADER_NAME
        return
      }
    }

    if (this.currentStatus === this.WAITING_HEADER_NAME) {
      if (char === '\r') {
        this.currentStatus = this.WAITING_HEADER_BLOCK_END
        return
      }

      if (char === ':') {
        this.currentStatus = this.WAITING_HEADER_SPACE
        return
      }

      this.headerName += char
    }

    if (this.currentStatus === this.WAITING_HEADER_SPACE) {
      if (char === ' ') {
        this.currentStatus = this.WAITING_HEADER_VALUE
        return
      }
    }

    if (this.currentStatus === this.WAITING_HEADER_VALUE) {
      if (char === '\r') {
        this.currentStatus = this.WAITING_HEADER_LINE_END
        this.headers[this.headerName] = this.headerValue
        this.headerName = ''
        this.headerValue = ''
        return
      } else {
        this.headerValue += char
      }
    }

    if (this.currentStatus === this.WAITING_HEADER_LINE_END) {
      if (char === '\n') {
        this.currentStatus = this.WAITING_HEADER_NAME
        return
      }
    }

    if (this.currentStatus === this.WAITING_HEADER_BLOCK_END) {
      if (char === '\n') {
        // console.log('parse header complete')
        this.bodyParser = new TrunkedBodyParse(this.headers['Transfer-Encoding'])
        return
      }
    }

    if (this.currentStatus === this.WAITING_BODY) {
      this.bodyPaser.receiveChar(char)
    }
  }
}

class TrunkedBodyParse {
  constructor(type) {
    this.type = type;
    switch (type) {
      case 'chunked': {
        this.WAINTING_LENGTH = 0;
        this.WAINTING_LENGTH_LINE_END = 1;
        this.READING_CHUNK = 2;
        this.WAITING_NEW_LINE = 3;
        this.WAITING_NEW_LINE_END = 4;

        this.curStatus = this.WAINTING_LENGTH;
        this.length = 0;
        this.finish = false;
        this.content = [];
      }
      default: break;
    }
  }

  receiveChar(char){
    console.log(this.curStatus, JSON.stringify(char))
    switch (this.type) {
      case 'chunked': {
        switch (this.curStatus) {
          case this.WAINTING_LENGTH: {
            if (char === '\r') {
              if (this.length === 0) {
                this.finish = true;
                break;
              }
              this.curStatus = this.WAINTING_LENGTH_LINE_END;
            } else {
              this.length *= 10;
              this.length += char.charCodeAt(0) - '0'.charCodeAt(0)
              console.log('this.length', char, this.length)
            }
            break;
          }
          case this.WAINTING_LENGTH_LINE_END: {
            if (char === '\n') {
              this.curStatus = this.READING_CHUNK;
            }
            break;
          }
          case this.READING_CHUNK: {
            this.content.push(char);
            this.length --;
            if (this.length === 0) {
              this.curStatus = this.WAITING_NEW_LINE;
            }
            break;
          }
          case this.WAITING_NEW_LINE: {
            if (char === '\r') {
              this.curStatus = this.WAITING_NEW_LINE_END;
            }
            break;
          }
          case this.WAITING_NEW_LINE_END: {
            if (char === '\n') {
              this.curStatus = this.WAINTING_LENGTH;
            }
            break;
          }
          default: break;
        }
        break;
      }
      default: break
    }
  }
}

class Response {

}

module.exports = {
  Response,
  ResponseParser,
  TrunnkedBodyParser
}