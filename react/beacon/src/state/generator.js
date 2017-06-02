import { State } from 'jumpstate'

export default State('generator', {
  // Initial State
  initial: {
    generate: false,
    messages: [],
    rfids: new Set(),
    lastId: null
  },
  // Actions
  showError(state, error) {
    return {
      error
    }
  },
  receivedRFID(state, rfid) {
    let ids = state.rfids
    let messages = state.messages
    messages.push('received rfid ' + rfid )
    return {
      ...state,
      generate: !ids.has(rfid),
      lastId: rfid,
      rfids: ids.add(rfid),
      messages
    }
  },
  gotUser(state, user) {
    let messages = state.messages
    messages.push('user exists')
    return {
      ...state,
      messages
    }
  }
})
