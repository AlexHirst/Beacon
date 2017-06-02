import { State } from 'jumpstate'

export default State({
  // Initial State
  initial: {
    rfid: null,
    firstname: "",
    lastname: "",
    birthdate: "1970-01-01",
    error: "",
    appointments: []
  },
  // Actions
  login (state, user) {
    return {
      ...state,
      ...user
    }
  },
  authUser (state, user) {
    return {
      ...state,
      ...user
    }
  },
  loadAppointments(state, appointments) {
    return {
      ...state,
      appointments
    }
  },
  showError(state, error) {
    console.log(state)
    return {
      error
    }
  }
})
