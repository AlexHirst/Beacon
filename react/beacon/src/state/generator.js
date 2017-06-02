import { Hook, State } from 'jumpstate'

export default State({
  // Initial State
  initial: {
    messages: [],
    rfid: null
  },
  // Actions
  showError(state, error) {
    return {
      error
    }
  }
})
