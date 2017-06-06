import { Actions } from 'jumpstate'

// Has to be the Pi URL
const wsUrl = "ws://192.168.7.190/ws";

class WS {
  constructor() {
    this.url = wsUrl
    this.connect()
  }

  connect() {
    this.websocket = new WebSocket(this.url);
    this.websocket.onopen = this.onOpen.bind(this)
    this.websocket.onclose = this.onClose.bind(this)
    this.websocket.onmessage = this.onMessage.bind(this)
    this.websocket.onerror = this.onError.bind(this)
  }

  changeIp(ip) {
    this.url = `ws://${ip}/ws`
    if (this.websocket) {
      this.websocket.close()
    }
    this.connect()
  }

  onOpen(evt)
  {
    console.log("connected")
  }

  onClose(evt)
  {
    console.log("disconnected")
  }

  onMessage(evt)
  {
    var msg = JSON.parse(evt.data);
    if (msg.reading) {
      Actions.user.receivedRFID(msg.reading)
      Actions.generator.receivedRFID(msg.reading)
    }
  }

  onError(evt)
  {
    console.log('error: ' + evt.data + '\n');
    this.websocket.close();
  }

  disconnect() {
    this.websocket.close();
  }

}

export default new WS()
